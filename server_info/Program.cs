using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Sockets;
using System.Net;
using System.Threading;
using System.Text.RegularExpressions;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using static HTTPServer.for_main;
using System.Linq;
using System.Text;

namespace HTTPServer
{
    
    // Класс-обработчик клиента
    class Client
    {

        private void SendError(TcpClient Client, int Code)
        {
            // Получаем строку вида "200 OK"
            // HttpStatusCode хранит в себе все статус-коды HTTP/1.1
            string CodeStr = Code.ToString() + " " + ((HttpStatusCode)Code).ToString();
            // Код простой HTML-странички
            string Html = "<html><body><h1>" + CodeStr + "</h1></body></html>";
            // Необходимые заголовки: ответ сервера, тип и длина содержимого. После двух пустых строк - само содержимое
            string Str = "HTTP/1.1 " + CodeStr + "\nContent-type: text/html\nContent-Length:" + Html.Length.ToString() + "\n\n" + Html;
            // Приведем строку к виду массива байт
            byte[] Buffer = Encoding.ASCII.GetBytes(Str);
            // Отправим его клиенту
            Client.GetStream().Write(Buffer, 0, Buffer.Length);
            // Закроем соединение
            Client.Close();
        }
        // Конструктор класса. Ему нужно передавать принятого клиента от TcpListener
        public Client(TcpClient Client)
        {



            // Объявим строку, в которой будет хранится запрос клиента
            string Request = "";
            // Буфер для хранения принятых от клиента данных
            byte[] Buffer = new byte[1024];
            // Переменная для хранения количества байт, принятых от клиента
            int Count;
            // Читаем из потока клиента до тех пор, пока от него поступают данные
            while ((Count = Client.GetStream().Read(Buffer, 0, Buffer.Length)) > 0)
            {
                // Преобразуем эти данные в строку и добавим ее к переменной Request
                Request += Encoding.ASCII.GetString(Buffer, 0, Count);
                // Запрос должен обрываться последовательностью \r\n\r\n
                // Либо обрываем прием данных сами, если длина строки Request превышает 4 килобайта
                // Нам не нужно получать данные из POST-запроса (и т. п.), а обычный запрос
                // по идее не должен быть больше 4 килобайт
                if (Request.IndexOf("\r\n\r\n") >= 0 || Request.Length > 4096)
                {
                    break;
                }
            }

            // Парсим строку запроса с использованием регулярных выражений
            // При этом отсекаем все переменные GET-запроса
            Match ReqMatch = Regex.Match(Request, @"^\w+\s+([^\s\?]+)[^\s]*\s+HTTP/.*|");

            // Если запрос не удался
            if (ReqMatch == Match.Empty)
            {
                // Передаем клиенту ошибку 400 - неверный запрос
                //SendError(Client, 400);
                return;
            }

            // Получаем строку запроса
            string RequestUri = ReqMatch.Groups[1].Value;

            // Приводим ее к изначальному виду, преобразуя экранированные символы
            // Например, "%20" -> " "

            RequestUri = Uri.UnescapeDataString(RequestUri);
            RequestUri = RequestUri.Replace("@/@","\\");
            RequestUri = RequestUri.Replace("@//@", "?");
            string FilePath = RequestUri;
            if (RequestUri.Length>0&& RequestUri[0] == '/')
            {

            
                var tmp_list = new List<char>(RequestUri.ToCharArray());
            tmp_list.RemoveAt(0);
             FilePath = new string(tmp_list.ToArray());
            }

            bool inside = false;
            if (File.Exists(FilePath))
            {
                string Extension = RequestUri.Substring(RequestUri.LastIndexOf('.'));
                inside = true;
                // Тип содержимого
                string ContentType = "";

                // Пытаемся определить тип содержимого по расширению файла
                switch (Extension)
                {
                    case ".htm":
                        ContentType = "text/html";
                        break;
                    case ".html":
                        ContentType = "text/html";
                        break;
                    case ".css":
                        ContentType = "text/css";
                        break;
                    case ".js":
                        ContentType = "text/javascript";
                        break;
                    case ".jpg":
                        ContentType = "image/jpeg";
                        break;
                    case ".jpeg":
                        ContentType = "image/" + Extension.Substring(1);
                        break;
                    case ".png":
                        ContentType = "image/" + Extension.Substring(1);
                        break;
                    case ".gif":
                        ContentType = "image/" + Extension.Substring(1);
                        break;
                    default:
                        if (Extension.Length > 1)
                        {
                            ContentType = "application/" + Extension.Substring(1);
                        }
                        else
                        {
                            ContentType = "application/unknown";
                        }
                        break;
                }

                // Открываем файл, страхуясь на случай ошибки
                FileStream FS;
                try
                {
                    FS = new FileStream(FilePath, FileMode.Open, FileAccess.Read, FileShare.Read);
                }
                catch (Exception)
                {
                    // Если случилась ошибка, посылаем клиенту ошибку 500
                    SendError(Client, 500);
                    return;
                }

                // Посылаем заголовки
                string Headers = "HTTP/1.1 200 OK\nContent-Type: " + ContentType + "\nContent-Length: " + FS.Length + "\n\n";
                byte[] HeadersBuffer = Encoding.ASCII.GetBytes(Headers);
                Client.GetStream().Write(HeadersBuffer, 0, HeadersBuffer.Length);

                // Пока не достигнут конец файла
                while (FS.Position < FS.Length)
                {
                    // Читаем данные из файла
                    Count = FS.Read(Buffer, 0, Buffer.Length);
                    // И передаем их клиенту
                    Client.GetStream().Write(Buffer, 0, Count);
                }

                // Закроем файл и соединение
                FS.Close();
                Client.Close();
            }
                if (RequestUri== "/favicon.ico")
            {

            }
            if (!inside && RequestUri == "/json_data_article")
            {
                inside = true;
                
                UTF8Encoding utf8 = new UTF8Encoding();
                string res  = File.ReadAllText(@"Article.json");
                byte[] Buffer1 = Encoding.UTF8.GetBytes(res);
                Client.GetStream().Write(Buffer1, 0, Buffer1.Length);
                Client.Close();

            }
            if (!inside && RequestUri == "/json_data_section")
            {
                inside = true;

                UTF8Encoding utf8 = new UTF8Encoding();
                string res = File.ReadAllText(@"Section.json");
                byte[] Buffer1 = Encoding.UTF8.GetBytes(res);
                Client.GetStream().Write(Buffer1, 0, Buffer1.Length);
                Client.Close();

            }
            if (!inside&&RequestUri == "/")
            {
                inside = true;
                string res = "";
                {

                    //string first_part_html = File.ReadAllText(@"in1.html");
                    //string second_part_html = "'><input type=\"hidden\" id=\"string_base_info_articles\" value='";
                    //string json_articles = File.ReadAllText(@"Article.json");
                    //string json_sections = File.ReadAllText(@"Section.json");
                    // string third_part_html = File.ReadAllText(@"in2.html");

                    //string[] str_from_file = File.ReadAllText(@"index.html").Split(new string[] { "<hr class=\"hr_for_replace_server_1\"/>" }, StringSplitOptions.None);
                    //res = str_from_file[0] + json_sections + str_from_file[1] + json_articles + str_from_file[2];
                    res = File.ReadAllText(@"index.html");
                }
                UTF8Encoding utf8 = new UTF8Encoding();
                //string Html = "<html><body><h1>It works!</h1></body></html>";
                // Необходимые заголовки: ответ сервера, тип и длина содержимого. После двух пустых строк - само содержимое
                string Str = "HTTP/1.1 200 OK\nContent-type: text/html\nContent-Length:" + res.Length.ToString() + "\n\n" + res;
                // Приведем строку к виду массива байт
                byte[] Buffer1 = Encoding.UTF8.GetBytes(Str);//Encoding.ASCII.GetBytes(Str);// utf8.GetBytes(Str);//Encoding.ASCII.GetBytes(Str);
                //string result = Encoding.UTF8.GetString(Buffer1);
                // Отправим его клиенту
                Client.GetStream().Write(Buffer1, 0, Buffer1.Length);
                // Закроем соединение
                Client.Close();
            }
            //TODO тут обрабатывать запрос

            if (!inside && RequestUri.IndexOf("/change_something/") == 0)
            {
                inside = true;
                string str = RequestUri.Substring(18);
                List<Object_from_user> tmp_list = new List<Object_from_user>();
                try
                {
                    DataContractJsonSerializer jsonFormatter_1 = new DataContractJsonSerializer(typeof(List<Object_from_user>));
                    using (var fs = new MemoryStream(Encoding.UTF8.GetBytes(str)))
                    {
                        tmp_list = (List<Object_from_user>)jsonFormatter_1.ReadObject(fs);
                    }
                }
                catch
                {
                    Console.WriteLine("Произошла ошибка при чтении строки отправенной "+
"пользователем для сохранения, был создан пустой список с статьями ");
                    //Article_list = new List<Article>();
                }


                foreach(var i in tmp_list)
                {
                    switch (i.Action)
                    {
                        case 1://добавляем
                            if (i.Type == 1)//секциия
                            {
                                Section_list.Add(new Section() {Id=i.Id, Parrent_id=(int)i.Parrent_id, Head=i.Head });
                            }
                            else if (i.Type == 2)//статья
                            {
                                Article_list.Add(new Article() { Id=i.Id, Section_id=(int)i.Section_id, Head=i.Head, Body=i.Body });
                            }
                            break;

                        case 2://удаляем
                            if (i.Type == 1)//секциия
                            {
                                Section_list.Remove(Section_list.First(x1 => x1.Id == i.Id));
                            }
                            else if (i.Type == 2)//статья
                            {
                                Article_list.Remove(Article_list.First(x1 => x1.Id == i.Id));
                            }
                            break;

                        case 3://редактируем

                            if (i.Type == 1)//секциия
                            {
                                var tmp = Section_list.First(x1 => x1.Id == i.Id);
                                tmp.Parrent_id = (int)i.Parrent_id;
                                tmp.Head = i.Head;
                            }
                            else if (i.Type == 2)//статья
                            {
                                var tmp = Article_list.First(x1 => x1.Id == i.Id);
                                tmp.Section_id = (int)i.Section_id;
                                tmp.Head = i.Head;
                                tmp.Body = i.Body;
                            }
                            break;


                    }
                }
                write_db();
                SendError(Client, 200);
            }
                /*
                if (!inside && RequestUri.IndexOf("/adds/") ==0)
                {
                    string str = "";
                    if(RequestUri.IndexOf("/section/") == 5)
                    {
                        inside = true;
                        str= RequestUri.Substring(14);

                        Section tmp_section = null;
                            DataContractJsonSerializer jsonFormatter_1 = new DataContractJsonSerializer(typeof(Section));
                            using (var fs= new MemoryStream(Encoding.UTF8.GetBytes(str)))
                            {
                             tmp_section = (Section)jsonFormatter_1.ReadObject(fs);


                            }
                        Section_list.Add(tmp_section);



                    }
                    if (RequestUri.IndexOf("/article/") == 5)
                    {
                        inside = true;
                    }
                }
                if (!inside && RequestUri.IndexOf("/edit/") == 0)
                {
                    if (RequestUri.IndexOf("/section/") == 5)
                    {
                        inside = true;
                    }
                    if (RequestUri.IndexOf("/article/") == 5)
                    {
                        inside = true;
                    }
                }
                if (!inside && RequestUri.IndexOf("/delete/") == 0)
                {
                    if (RequestUri.IndexOf("/section/") == 7)
                    {
                        inside = true;
                    }
                    if (RequestUri.IndexOf("/article/") == 7)
                    {
                        inside = true;
                    }
                }
                */

            }
    }
     static class for_main
    {
        public static List<Article> Article_list = new List<Article>();
        public static List<Section> Section_list = new List<Section>();

        public static string get_json_string(object a)
        {
            string res = "";



            return res;
        }
        public static bool read_db()
        {
            bool success = false;
            try
            {


                DataContractJsonSerializer jsonFormatter_1 = new DataContractJsonSerializer(typeof(List<Article>));
                using (FileStream fs = new FileStream("Article.json", FileMode.OpenOrCreate))
                {
                    Article_list = (List<Article>)jsonFormatter_1.ReadObject(fs);


                }
            }
            catch {
                Console.WriteLine("Произошла ошибка при чтении Article.json, был создан пустой список с статьями ");
                Article_list = new List<Article>();
            }
            try
            {
                DataContractJsonSerializer jsonFormatter_2 = new DataContractJsonSerializer(typeof(List<Section>));
                using (FileStream fs = new FileStream("Section.json", FileMode.OpenOrCreate))
                {
                    Section_list = (List<Section>)jsonFormatter_2.ReadObject(fs);
                }
            }
            catch
            {
                Console.WriteLine("Произошла ошибка при чтении Section.json, был создан пустой список с секциями ");
                Section_list = new List<Section>();
            }

            return success;
        }
        public static bool write_db()
        {
            bool success = false;
            //read_db();


            //TODO достать из браузера если что то добавлено и добавить в главные списки


            DataContractJsonSerializer jsonFormatter_1 = new DataContractJsonSerializer(typeof(List<Article>));
            using (FileStream fs = new FileStream("Article.json", FileMode.Create))
            {
                jsonFormatter_1.WriteObject(fs, Article_list);
                
            }
            DataContractJsonSerializer jsonFormatter_2 = new DataContractJsonSerializer(typeof(List<Section>));
            using (FileStream fs = new FileStream("Section.json", FileMode.Create))
            {
                jsonFormatter_2.WriteObject(fs, Section_list);
            }
            return success;
        }
    }
    class Server
    {
        TcpListener Listener; // Объект, принимающий TCP-клиентов
        


        
        // Запуск сервера
        public Server(int Port)
        {
            // Создаем "слушателя" для указанного порта
            Listener = new TcpListener(IPAddress.Any, Port);
            Listener.Start(); // Запускаем его
            new Client(Listener.AcceptTcpClient());
            // В бесконечном цикле
            while (true)
            {
                // Принимаем новых клиентов
                ThreadPool.QueueUserWorkItem(new WaitCallback(ClientThread), Listener.AcceptTcpClient());
            }
        }

        // Остановка сервера
        ~Server()
        {
            // Если "слушатель" был создан
            if (Listener != null)
            {
                // Остановим его
                Listener.Stop();
            }
            //write_db();
        }

        static void Main(string[] args)
        {
            // Определим нужное максимальное количество потоков
            // Пусть будет по 4 на каждый процессор
            int MaxThreadsCount = Environment.ProcessorCount * 4;
            // Установим максимальное количество рабочих потоков
            ThreadPool.SetMaxThreads(MaxThreadsCount, MaxThreadsCount);
            // Установим минимальное количество рабочих потоков
            ThreadPool.SetMinThreads(2, 2);
            read_db();
            
            // Создадим новый сервер на порту 80
            new Server(80);
        }
        static void ClientThread(Object StateInfo)
        {
            new Client((TcpClient)StateInfo);
        }
    }


    public class Article
    {
        public int Id { get; set; }
        public int Section_id { get; set; }
        public string Head { get; set; }
        public string Body { get; set; }
        //public int Id { get; set; }
        //public int Id { get; set; }
        public Article()
        {
            Id = 0;
            Section_id = 0;
            Head = null;
            Body = null;
        }
    }
    public class Section
    {
        public int Id { get; set; }
        public int Parrent_id { get; set; }
        public string Head { get; set; }
        //public List<Section> Sections_list { get; set; }
        //public List<Section> Article_list { get; set; }

        public Section()
        {
            Id = 0;
            Parrent_id = 0;
            Head = "";
        }
    }
    public class Object_from_user
    {
        public int Id { get; set; }
        public int? Action { get; set; }
        public int? Type { get; set; }
        public int? Section_id { get; set; }
        public int? Parrent_id { get; set; }
        public string Head { get; set; }
        public string Body { get; set; }

        public Object_from_user()
        {
            Id = -1;
            Action = null;
            Type = null;
            Section_id = null;
            Parrent_id = null;
            Head = null;
            Body = null;
        }
    }
    }