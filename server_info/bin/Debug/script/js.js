// box-shadow: 0 0 10px rgba(0,0,0,0.5);
//TODO
/*
<!--TODO-->
<!--div_left_column высоту нормально задавать-->
<!--main_top_div ширину нормально-->
<!--для картинки можно попробовать из байтов ее строить-->
<!---->

<!--<button onclick="console.log('sdf')">11111111111111111111111</button>-->




реальзация поиска

ширину divов левого и правого задавать из js а не css

добавить резервное копирование и спрашивать о том нужно ли сохранение(мб просто кнопку в меню сверху)

передавать в шарп в json строке всю инфу которая нужна
после каждого действия (сохранния удаления сохранять это действие в json и в html)




кнопка для закрытия всех вкладок
hidden_search_block мб не нужен и тот что рядом тоже

возможность редактирования выделенного объекта
на стороне сервера или js если сохраняется код html то надо "<>" заменять на "&lt; и &gt;"   //При этом тег <p> будет выглядеть как &lt;p&gt;

при наведении на кнопки делать их "выдавливание " тенью

проверить что бы везде были ;;;;


хранить путь к выделенной вкладке и выделять весь путь
хранить открытые вкладки что бы можно было восстановить все как было
добавить защиту на клики(пока определенная функция не выполнится не разрешать менять last_click_name)

разобраться c хранением данных htmlи вообще потестить как хранятся отображаются разные комбинации и тдтдтдтд


когда скрывается левый список кнопкой и потом тянуть блок с настройками вправо уже руками, для списка размер плохой задается попробовать пофиксить

+++++++
//при удалении запретить удалять внешний блок!!!!!!!!!
//слева в строке кнопку для подъема наверх
//add_section_form починить
//вынести в функцию перемещение центра настроек и цента блоков
//для прозрачных элементов background
//При клике выделчть визуально и сохранять id блока
//при клике на пустую секцию(id4) открывается пустая подсекция которая тоже отображается пиклесей на 5
//старт при маленьком экране блок настроек налезает на блок с поиском
//клик который открывает меню слева должен скрывать меню справа если меню слева уже открыто
//при удалении внешнего блока удалять все в нем но не его
//при перемещении блока настроек переносить блок с поиском
//кнопка круглая будет именно кнопкой для поиска
//добавить тени и css
//TODO прикрутить это что бы при клики правой и зажатой левой возвращалось назад и корды хранить в объекте 
//+проверить добавить скролл по х для блоков
//хранить последнеий нажатый блок
//+проверить document.onmousemove   проверки на выход за границы
//И добавить треугольники открывающиеся и закрывающиеся на блоки Как бы разворот
//колонку слева высоту ей задавать js
//линия в блоке сверху сделать что бы ей можно было менять рамеры divов
//слева человеческий список сделать
// вроде ++
функция для получения записи из массива по id написать и заменить 
for(var i=0;i<mass_section.length;++i)
				if(mass_section[i].Id==id)
					return mass_section[i];


//
//кнопка редактирования
//после того как распарсил по массивам можно удалять <div class="div_for_base_info" id="div_for_base_info_id">
//написать функцию для отрисовки блока с названием секции
//edit_select_section_form и рядом доделать
//подумать над внутренними тенями особенно на кнопки и сделать кнопки как то красивее и "активнее"
//блок настроек сейчас немного не симметрично расположен 1-2 пикселя
//когда смещаю влево блок с кнопками смещать правее блок menu или вообще его на постоянку переместить правее и смотреть что бы его не перекрывала кнопка поиска
//передавать с клиента все 1 строкой
//сделать класс в котором свойства обоих классов


*/


		//console.log(client_width);
		var client_width=0;
		var client_heigth=0;
		var x_centre=0;//относительно всего экрана(от левого края БРАУЗЕРА)
		var change_x_centre_object={};
		change_x_centre_object.click_change_x_centre=null;

		var mass_section=null;
		var mass_article=null;
		var last_click_name=null;


	//change_x_centre_object.coords=null;
	if (document.addEventListener){
		document.addEventListener("DOMContentLoaded", page_first_start);
	} else if (document.attachEvent){
		document.attachEvent('DOMContentLoaded', page_first_start);
	}
	//document.addEventListener("DOMContentLoaded", page_first_start);

	document.onmouseup=function(e) {
		click_on_centre_settings(false);
	}
	document.onmousedown=function(e) {
		if(event.which == 3){
		//TODO прикрутить это что бы при клики правой и зажатой левой возвращалось назад и корды хранить в объекте 
		click_on_centre_settings(false);
	}

}

document.onmousemove = function(e) {
	if(change_x_centre_object.click_change_x_centre==true){
	//TODO проверки что бы за края не выходило
	var sett_block=document.getElementById("div_settings_block_id");
	var left_line_div=document.getElementById("div_left_column_id");
	var cord_mouse=event.clientX;
	var right_div=document.getElementById("main_block_right_id");
	if(cord_mouse<left_line_div.getBoundingClientRect().right){//(sett_block.getBoundingClientRect().left+sett_block.offsetWidth/2)
//sett_block.style.left=(left_line_div.offsetWidth+sett_block.offsetWidth/2)+"px";

cord_mouse=left_line_div.getBoundingClientRect().right;

}
else
// if(cord_mouse>right_div.getBoundingClientRect().right){//sett_block.getBoundingClientRect().right
// cord_mouse=right_div.getBoundingClientRect().right;
// }
if((cord_mouse+sett_block.offsetWidth/2)>client_width)
	cord_mouse=client_width-sett_block.offsetWidth/2;






	//var src_div=document.getElementById("div_search_id");
	//TODO переменная для проверок??
	var centre=cord_mouse;//-src_div.offsetWidth
//TODO после проверок
x_centre=centre;



var left_div=document.getElementById("main_block_left_id");

change_centre(centre);
//sett_block.style.left=(centre-sett_block.offsetWidth/2)+'px';//-sett_block.offsetWidth/2
if(sett_block.getBoundingClientRect().left<310){
	move_search_div(450);
}
else if(document.getElementById("div_search_id").getBoundingClientRect().right>50){
	move_search_div(0);
}



//left_div.style.width=centre-left_line_div.offsetWidth-5+'px';
left_div.style.display='block';
//right_div.style.left=centre-left_line_div.offsetWidth+5+'px';
//right_div.style.width=client_width-centre-5+'px';

//console.log(centre);



//TODO прикрутить это что бы при клики правой и зажатой левой возвращалось назад и корды хранить в объекте 
// event.which == 1 – левая кнопка
// event.which == 2 – средняя кнопка
// event.which == 3 – правая кнопка
}
}
function up() {
	var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	if (top > 0) {
		window.scrollBy(0, -100);
		time_for_page_up = setTimeout('up()', 20);
	} else clearTimeout(time_for_page_up);
	return false;
}


function page_first_start(){
	client_width=document.documentElement.clientWidth;
			//alert(client_width);
			client_heigth=document.documentElement.clientHeight;
			var left_div=document.getElementById("main_block_left_id");
			//var right_div=document.getElementById("main_block_right_id");
			var left_line_div=document.getElementById("div_left_column_id");
			var div_for_block=document.getElementById("div_for_block_id");
			div_for_block.style.width=((client_width-left_line_div.offsetWidth)+'px');
			x_centre=left_line_div.offsetWidth+left_div.offsetWidth;
			var setting_div=document.getElementById("div_settings_block_id");
			setting_div.style.left=x_centre-(setting_div.offsetWidth/2)+'px';//marginLeft
			//left_div.style.width = (client_width-left_line_divoffsetWidth)*0.3 +'px;'
			//right_div.style.width = (client_width-left_line_divoffsetWidth)*0.7 +'px;'
			left_line_div.style.height = client_heigth+'px'

			var right_div=document.getElementById("main_block_right_id");
			right_div.style.left=left_div.offsetWidth+5+'px';

			var left_top_button=document.getElementById("scroll_top_button_id");
			left_top_button.style.marginTop = document.getElementById("div_for_top_menu_id").getBoundingClientRect().bottom+'px';


			if(setting_div.getBoundingClientRect().left<310){
				move_search_div(450);
			}
			else if(document.getElementById("div_search_id").getBoundingClientRect().right>50){
				move_search_div(0);
			}


//

			//-------------------------
			mass_section=JSON.parse(document.getElementById("string_base_info_sections").value);
			mass_article=JSON.parse(document.getElementById("string_base_info_articles").value);
			var str_res_for_left_ul=load_one_section(1);

			left_div.innerHTML=str_add_name_section(1,true)+str_res_for_left_ul;
			// left_div.innerHTML="<div id='div_one_section_name_1' class='div_one_section_name' onclick='click_name_section(this)'><div id='before_for_sect_name_1' class='before_for_sect_name div_inline_block'></div><div class='div_inline_block'>"+'ALL'+"</div></div>"+str_res_for_left_ul;
			document.getElementById("div_for_base_info_id").innerHTML="";
		}


		function str_add_name_section(id,all){
			var res="";
			if(all!=null&&all==true)
				res+="<div  class='div_one_section_name' onclick='click_name_section(this)' id='div_one_section_name_"+id+"'>";
			res+="<div id='before_for_sect_name_"+id+"' class='before_for_sect_name div_inline_block'></div><div class='div_inline_block' id='div_one_section_name_text_"+id+"'>"+ find_in_mass(id,1).Head+"</div>";
			if(all!=null&&all==true)
				res+="</div>";

			return res;
		}
		function load_one_section(id){
	// style='height:0;' для div_one_section_inside_inside_ если пытаться сделлать плавное открывание и раскомментить css div.div_one_section_inside_inside
	var res="<div style='display:none;' class='div_one_section_inside_cl' id='div_one_section_inside_"+id+"'><div class='div_one_section_inside_inside' id='div_one_section_inside_inside_"+id+"'>\
	<div class='div_inside_sections' id='div_inside_sections_"+id+"'>";

	var mass_with_id=[];
	for(var i=0;i<mass_section.length;++i){
		if(mass_section[i].Parrent_id==id)
			mass_with_id.push(mass_section[i].Id);
	}
	//if(mass_with_id.length>0)
	//	res+="<div></div>";



	for(var i=0;i<mass_with_id.length;++i){
		// res+="<div  class='div_one_section_name' onclick='click_name_section(this)' id='div_one_section_name_"+mass_with_id[i]+"'><div id='before_for_sect_name_"+mass_with_id[i]+"' class='before_for_sect_name div_inline_block'></div><div class='div_inline_block'>"+ find_in_mass(mass_with_id[i],1).Head+"</div></div>";
		res+=str_add_name_section(mass_with_id[i],true);
		res+=load_one_section(mass_with_id[i]);
	}

	res+="</div><div class='div_inside_articles' id='div_inside_articles_"+id+"'>";

	for(var i=0;i<mass_article.length;++i){
		if(mass_article[i].Section_id==id){
				//res+="<div>";
				res+="<div class='div_one_article_name' id='div_one_article_name_"+mass_article[i].Id+"' onclick='load_article("+mass_article[i].Id+")'>"+mass_article[i].Head+"</div>";
		//res+="<div>"+mass_article[i].Body+"</div>";

		//res+="</div>";
	}
}

res+="</div></div></div>";
return res;
}








function find_in_mass(id,type_mass){//1--секция 2--артикл
	if(id==null||id==undefined)
		return null;
	if(type_mass==1){
		for(var i=0;i<mass_section.length;++i)
			if(mass_section[i].Id==id)
				return mass_section[i];
			
		}
		else if(type_mass==2){
			for(var i=0;i<mass_article.length;++i)
				if(mass_article[i].Id==id)
					return mass_article[i];
			}
			return null;
		}


		function select_view_line(new_click_id){
			if(new_click_id!=null&&new_click_id!=undefined){
				var block_prev=document.getElementById(last_click_name);
				var block_current=document.getElementById(new_click_id);
				if(block_prev!=null){
					block_prev.style.backgroundColor='';
				}
				if(block_current!=null){
					block_current.style.backgroundColor='#F08080';
					last_click_name=new_click_id;
				}
			}
		}

		function click_name_section(a){
			select_view_line(a.id);
			//last_click_name=a.id;
			var num_id=a.id.split('_')[4];
			var div=document.getElementById("div_one_section_inside_"+num_id);
			//var div_2=document.getElementById("div_one_section_inside_inside_"+num_id);
			var before_d=document.getElementById("before_for_sect_name_"+num_id);
			if(div.style.display==''||div.style.display=='inline-block'){
				
				before_d.style.borderLeft='30px solid black';
				before_d.style.borderBottom='15px solid transparent';
				before_d.style.borderTop='15px solid transparent';

				div.style.display='none';
				//div_2.style.height='0';
			}
			
			else{
				//div_2.style.height='300px';

				var div_in_sec=document.getElementById("div_inside_sections_"+num_id);
				var div_in_art=document.getElementById("div_inside_articles_"+num_id);


				before_d.style.borderTop='30px solid black';
				before_d.style.borderRight='15px solid transparent';
				before_d.style.borderLeft='15px solid transparent';


				if(div_in_sec.innerHTML!=''||div_in_art.innerHTML!='')
					div.style.display='inline-block';
			}
			
		}


		function load_article(id_ar){
			var acticle=null;
			select_view_line('div_one_article_name_'+id_ar);
			//last_click_name=id_ar;
			for(var i=0;i<mass_article.length;++i)
				if(mass_article[i].Id==id_ar){
					acticle=mass_article[i];
					break;
				}
				var res="";
				var right_div=document.getElementById("main_block_right_id");
				res="<div>";
				res+="<h1>";
				res+=acticle.Head;
				res+="<h1>";
				res+="<div>";
				res+=acticle.Body;
				res+="</div>";
				res+="</div>";
				right_div.innerHTML=res;
			}

			function show_top_menu(){
				var top_menu=document.getElementById("div_for_top_menu_id");
				//var top_setings=document.getElementById("div_settings_block_id");
				top_menu.style.left ="0";
				//top_setings.style.top="70px";
				var ch=document.getElementById("div_settings_bottom_b_ex");
				ch.innerHTML="<div class='div_settings_top_b' onclick='hidden_top_menu()'></div>";
			}


			function hidden_top_menu(){
				var top_menu=document.getElementById("div_for_top_menu_id");
				//var top_setings=document.getElementById("div_settings_block_id");
				top_menu.style.left="-70px";
				//top_setings.style.top="0";
				var ch=document.getElementById("div_settings_bottom_b_ex");
				ch.innerHTML="<div class='div_settings_bottom_b' onclick='show_top_menu()'></div>";

			}


			function show_left_menu(){
				var left_div=document.getElementById("main_block_left_id");
				var setting_div=document.getElementById("div_settings_block_id");
				//var right_div=document.getElementById("main_block_right_id");
				//var left_line_div=document.getElementById("div_left_column_id");
				if(left_div.style.display == 'none'){
					left_div.style.display = 'block';
					change_centre(x_centre);
// 				right_div.style.width = '';
// 				left_div.style.width=x_centre-left_line_div.offsetWidth+'px';
// 				l
// right_div.style.left =left_div.offsetWidth+5+'px';//left_line_div.offsetWidth

// setting_div.style.left=x_centre-left_line_div.offsetWidth+5+'px';//setting_div.offsetWidth/2

move_search_div(0);
}
else{
	change_centre(client_width-setting_div.offsetWidth/2);
}
}

//----------------------
//-----------------lh----
function change_centre(coord){//координата от левого края  //change_var   
	var left_div=document.getElementById("main_block_left_id");
	var setting_div=document.getElementById("div_settings_block_id");
	var right_div=document.getElementById("main_block_right_id");
	var left_line_div=document.getElementById("div_left_column_id");


	setting_div.style.left=coord-setting_div.offsetWidth/2+'px';
left_div.style.width=coord-left_line_div.offsetWidth-3+'px';//setting_div.getBoundingClientRect().left+
//alert(client_width-setting_div.style.left.split('px')[0]);
right_div.style.width=client_width-coord-6+'px';//(client_width-setting_div.style.left.split('px')[0])
right_div.style.left=coord-left_line_div.offsetWidth+3+'px';//setting_div.style.left.split('px')[0]+

}

function hidden_left_menu(){
	var left_div=document.getElementById("main_block_left_id");

	var right_div=document.getElementById("main_block_right_id");
	var left_line_div=document.getElementById("div_left_column_id");
	var setting_div=document.getElementById("div_settings_block_id");
	if(left_div.style.display=='block'||left_div.style.display==''){
// 		right_div.style.width = (client_width-left_line_div.offsetWidth)+'px';
// right_div.style.left =0;//left_line_div.offsetWidth

// setting_div.style.left=left_line_div.offsetWidth-(setting_div.offsetWidth/2)+'px';
if(setting_div.getBoundingClientRect().left<x_centre){//left_line_div.offsetWidth+
	change_centre(left_line_div.offsetWidth);
	left_div.style.display = 'none';
	move_search_div(300);
}
else{
	change_centre(x_centre);
	if(setting_div<310)
		move_search_div(450);
}
}

//change_centre(left_line_div.offsetWidth);
// setting_div.style.left=client_width-setting_div.offsetWidth+'px';
// left_div.style.width=client_width-setting_div.offsetWidth/2-left_line_div.offsetWidth+'px';//setting_div.getBoundingClientRect().left+

// right_div.style.width=(client_width-setting_div.style.left.split('px')[0])+'px';
// right_div.style.left=client_width-left_line_div.offsetWidth-setting_div.offsetWidth/2+5+'px';//setting_div.style.left.split('px')[0]+



}


function show_search_block(){
	var div=document.getElementById("div_search_id");
	div.style.width = '300px';
	var div_img=document.getElementById("div_search_img_id");
	div_img.style.transform='rotateY(180deg)';
}


function hidden_search_block(){
	var div=document.getElementById("div_search_id");
	div.style.width = '55px';
	var div_img=document.getElementById("div_search_img_id");
	div_img.style.transform='rotateY(0deg)';
}

function start_search(){


}
function click_on_centre_settings(flag){
	change_x_centre_object.click_change_x_centre=flag;
	var sett_block=document.getElementById("div_settings_block_id");
	var left_div=document.getElementById("main_block_left_id");
	var right_div=document.getElementById("main_block_right_id");
	if(flag==true){
		sett_block.style.transition='0s';
		left_div.style.transition='0s';
		right_div.style.transition='0s';
	}
	else{
		sett_block.style.transition='1s';
		left_div.style.transition='1s';
		right_div.style.transition='1s';
	}

}


function add_section(){
//div_for_adds_info_id
//last_click_name
if(last_click_name!=null)
	if(last_click_name.indexOf('div_one_section_name_')<0)
		alert('выберите секцию');
	else{
		var right_div=document.getElementById("main_block_right_id");
		var res=add_form_for_add_or_edit(null,1);
		right_div.innerHTML=res;
	}
	else
		alert('выберите секцию');


}
function add_section_form(){
//mass_section
var right_div=document.getElementById("main_block_right_id");
var sect_name_input=document.getElementById("input_for_section_head");
var div_save=document.getElementById("div_for_change_info_id");
var obj={};
obj.Id=+find_maximum_id(mass_section) +1;
obj.Parrent_id=last_click_name.split('_')[4];
obj.Head=sect_name_input.value;

var inside_sect=document.getElementById("div_inside_sections_"+obj.Parrent_id);
mass_section.push(obj);
//TODO занести в html и обновить инфу в списке
var res="";

for(var num=0;document.getElementById('save_adds_section_'+num)!=null;++num);

	res+="<input id='save_adds_section_"+num+"' type='hidden' value='"+obj.Id+"'>";
res+="<input id='save_adds_section_parrent_id_"+obj.Id+"' type='hidden' value='"+obj.Parrent_id+"'>";
res+="<input id='save_adds_section_head_"+obj.Id+"' type='hidden' value='"+obj.Head+"'>";
div_save.innerHTML+=res;
var tmp="";



tmp+=str_add_name_section(obj.Id,true);
// tmp+="<div  class='div_one_section_name' onclick='click_name_section(this)' id='div_one_section_name_"+obj.Id+"'><div id='before_for_sect_name_"+obj.Id+"' class='before_for_sect_name div_inline_block'></div><div class='div_inline_block'>"+ find_in_mass(obj.Id,1).Head+"</div></div>";
tmp+=load_one_section(obj.Id);
inside_sect.innerHTML+=tmp;


right_div.innerHTML='';
}
function find_maximum_id(mass){
	var max=null;
	for(var i=0;i<mass.length;++i)
		if(max==null||max<mass[i].Id)
			max=mass[i].Id;
		return max;
		
	}

	function add_article(){
		if(last_click_name!=null)
			if(last_click_name.indexOf('div_one_section_name_')<0)
				alert('выберите секцию');
			else{
				var right_div=document.getElementById("main_block_right_id");
				var res=add_form_for_add_or_edit(null,2)
				right_div.innerHTML=res;
			}
			else
				alert('выберите секцию');

		}
		function add_article_form(){
			var right_div=document.getElementById("main_block_right_id");
			var sect_name_input=document.getElementById("input_for_article_head");
			var sect_body_input=document.getElementById("input_for_article_body");
			var div_save=document.getElementById("div_for_change_info_id");
			var obj={};
			obj.Id=+find_maximum_id(mass_article) +1;
			obj.Section_id=+last_click_name.split('_')[4];
			obj.Head=sect_name_input.value;
			obj.Body=sect_body_input.value;

			var inside_sect=document.getElementById("div_inside_articles_"+obj.Section_id);
			mass_article.push(obj);
//TODO занести в html и обновить инфу в списке
var res="";

for(var num=0;document.getElementById('save_adds_article_'+num)!=null;++num);

	res+="<input id='save_adds_article_"+num+"' type='hidden' value='"+obj.Id+"'>";
res+="<input id='save_adds_article_section_id_"+obj.Id+"' type='hidden' value='"+obj.Section_id+"'>";
res+="<input id='save_adds_article_head_"+obj.Id+"' type='hidden' value='"+obj.Head+"'>";
res+="<input id='save_adds_article_body_"+obj.Id+"' type='hidden' value='"+obj.Body+"'>";
div_save.innerHTML+=res;
var tmp="";

tmp+="<div class='div_one_article_name' id='div_one_article_name_"+obj.Id+"' onclick='load_article("+obj.Id+")'>"+obj.Head+"</div>";

inside_sect.innerHTML+=tmp;
right_div.innerHTML='';
}

function dell_select(){

//функция не нужна
	// function find_child_section(id){
	// 	var res='';

	// 	for(var i=0;i<mass_section.length;++i){
	// 		if(mass_section[i].Parrent_id==id){
	// 			res+=mass_section[i].Id;
	// 			res+="_"+find_child_section(mass_section[i].Id);
	// 		}
	// 	}


	// 	return res;
	// }



	var id=last_click_name.split('_')[4];
	if(last_click_name==null){
		alert("выберите что-то для удаления");
		return;
	}


	if(last_click_name.indexOf("div_one_section_name")>=0){
		//for(var num=0;document.getElementById('save_delete_section_'+num)!=null;++num);
		//	var tmp_bl=null;

		delete_section_f(id);
	}
	else if(last_click_name.indexOf("div_one_article_name")>=0){

		delete_article_f(id);
	}
	last_click_name=null;
	document.getElementById("main_block_right_id").innerHTML="";

}
function delete_section_f(id){
	var div_save=document.getElementById("div_for_change_info_id");
	var div=document.getElementById("div_one_section_name_"+id);
	var div_in=document.getElementById("div_one_section_inside_"+id);
	//var div_in=document.getElementById("div_one_section_inside_"+id);
//div_inside_articles_2 
if(find_in_mass(id,1)==null)
	return;
for(var i=0;i<mass_article.length;++i)
	if(mass_article[i].Section_id==id)
		delete_article_f(mass_article[i--].Id);

	var tmp_bl=null;
	for(var i=0;i<mass_section.length;++i){
		if(mass_section[i].Parrent_id==id){
			delete_section_f(mass_section[i--].Id);
//alert(tmp_bl);

}


}
if(id==1)
	return;
for(var i=0;i<mass_section.length;++i){
	
	if(mass_section[i].Id==id){
		tmp_bl=mass_section.splice(i, 1);
//alert(tmp_bl);
break;
}
}
for(var num=0;document.getElementById('save_delete_section_'+num)!=null;++num);
	var tmp_str="<input id='save_delete_section_"+num+"' type='hidden' value='"+id+"'>";;

div_save.innerHTML+=tmp_str;
div.remove();
div_in.remove();

}
function delete_article_f(id){
	var div_save=document.getElementById("div_for_change_info_id");
	var div=document.getElementById('div_one_article_name_'+id);
	var tmp_bl=null;
	for(var i=0;i<mass_article.length;++i){
		if(mass_article[i].Id==id){
			tmp_bl=mass_article.splice(i, 1);
//alert(tmp_bl);
break;
}
}
for(var num=0;document.getElementById('save_delete_article_'+num)!=null;++num);
	var tmp_str="<input id='save_delete_article_"+num+"' type='hidden' value='"+id+"'>";;

div_save.innerHTML+=tmp_str;
div.remove();

}
// function click_up_on_centre_settings(){

// }
function move_search_div(marginleft){
	var search_div=document.getElementById("div_search_id");
	search_div.style.marginLeft = marginleft+'px';
}


function edit_select(){
	var id=last_click_name.split('_')[4];

	if(last_click_name==null){
		alert("выберите что то для редактирования");
		return;
	}
	var right_div=document.getElementById("main_block_right_id");
	// var res='<div>';


	var res='';
	if(last_click_name.indexOf("div_one_section_name")>=0){
		res+=add_form_for_add_or_edit(id,1);

		
	}
	else if(last_click_name.indexOf("div_one_article_name")>=0){
		res+=add_form_for_add_or_edit(id,2);


	}
	right_div.innerHTML=res;
}
function add_form_for_add_or_edit(id ,type){//1 секция 2 статья
	var res='';
	switch (type) {
		case 1:
		var block=find_in_mass(id,type);
		res+='<div><label>Заголовок</label>';
		res+='<textarea class="text_area_add_edit" id="input_for_section_head">'+(block==null?'':block.Head)+'</textarea>';
		if(block==null)
			res+='<button onclick="add_section_form()">Добавить раздел</button>';
		else
			res+='<button onclick="edit_select_section_form('+id+')">Сохранить название</button>';
		res+='</div>';
		break;
		case 2:
		var block=find_in_mass(id,type);



		res+='<div><label>Заголовок</label>';
		res+='<textarea class="text_area_add_edit" id="input_for_article_head">'+(block==null?'':block.Head)+'</textarea>';
				//res+='<input type="text" id="input_for_article_body">';
				res+='<label>Содержание</label>';
				res+='<textarea class="text_area_add_edit" id="input_for_article_body">'+(block==null?'':block.Body)+'</textarea>';
				if(block==null)
					res+='<button onclick="add_article_form()">Добавить статью</button>';
				else
					res+='<button onclick="edit_select_article_form('+id+')">Сохранить</button>';
				res+='</div>';
				break;
				default:
		// statements_def
		alert("error");
		break;
	}
	return res;
}

//TODO обновлять как в оперативке так и view
function edit_select_section_form(id){
	var block=find_in_mass(id,1);
	var section=document.getElementById("div_one_section_name_text_"+id);
	block.Head=document.getElementById("input_for_section_head").value;
//TODO
section.innerHTML=block.Head;
//section.innerHTML=str_add_name_section(id,false);
document.getElementById("main_block_right_id").innerHTML="";

var div_save=document.getElementById("div_for_change_info_id");

for(var num=0;document.getElementById('save_edit_section_'+num)!=null;++num);
	var tmp_str="<input id='save_edit_section_"+num+"' type='hidden' value='"+id+"'>";
tmp_str+="<input id='save_edit_section_id_head_"+id+"' type='hidden' value='"+block.Head+"'>";
div_save.innerHTML+=tmp_str;

}
function edit_select_article_form(id){
	var block=find_in_mass(id,2);
	var name=document.getElementById("div_one_article_name_"+id);
	block.Head=document.getElementById("input_for_article_head").value;
	block.Body=document.getElementById("input_for_article_body").value;
//TODO
name.innerHTML=block.Head;
name.click();
for(var num=0;document.getElementById('save_edit_article_'+num)!=null;++num);
	var tmp_str="<input id='save_edit_article_"+num+"' type='hidden' value='"+id+"'>";
tmp_str+="<input id='save_edit_article_id_head_"+id+"' type='hidden' value='"+block.Head+"'>";
tmp_str+="<input id='save_edit_article_id_body_"+id+"' type='hidden' value='"+block.Body+"'>";
div_save.innerHTML+=tmp_str;

}



function save_server_db(){
	//TODO проверить , вроде не все поля сохраняются(parrent_id)
// save_edit_article_ по счетчику смотрю id и по id беру данные в  save_edit_article_id_head_+id   save_edit_article_id_body_+id
// save_edit_section_ по счетчику смотрю id и по id беру данные в  save_edit_section_id_head_+id  
//save_delete_article_ по счетчику смотрю id
//save_delete_section_  по счетчику смотрю id
//save_adds_article_id_ по счетчику смотрю id по id беру данные в save_adds_article_section_id_  save_adds_article_head_  save_adds_article_body_
//save_adds_section_id_  по счетчику смотрю id по id беру данные в  save_adds_section_parrent_id_  save_adds_section_head_

var link=document.getElementById("_link_for_ajax_");
var mass_obj=[];

send("save_adds_section_",1,1);
send("save_adds_article_",1,2);
send("save_edit_section_",3,1);
send("save_edit_article_",3,2);
send("save_delete_section_",2,1);//2
send("save_delete_article_",2,2);//2


var str="/change_something/"+JSON.stringify(mass_obj);
	link.href=str;
	link.click();
link.href='';
var div_save=document.getElementById("div_for_change_info_id");
div_save.innerHTML='';
function send(str_id,type,p_type){
	//var str=str_;
	var tmp=document.getElementById(str_id+'0');
	
	var block=null;
	for(var i=0;tmp!=null;tmp=document.getElementById(str_id+ ++i)){
		var obj={};
		var html_for_save_id=tmp.value;
		if(type==1||type==3){
	 block=find_in_mass(html_for_save_id,p_type);
	
}
else if(type==2){

	block={};
	block.Id=html_for_save_id;
}
obj.Id=block.Id;
obj.Action=type;
obj.Type=p_type;
obj.Section_id=block.Section_id==undefined?null:block.Section_id;
obj.Parrent_id=block.Parrent_id==undefined?null:block.Parrent_id;
obj.Head=block.Head==undefined?null:block.Head;
obj.Body=block.Body==undefined?null:block.Body;


	mass_obj.push(obj);
}

}
}

function OnComplete_(request, status) { 
	alert("Статус запроса : " + status); 
	alert("request : " + request); 
}