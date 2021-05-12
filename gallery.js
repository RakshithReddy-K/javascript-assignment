/*function loadJson()
{
    const x=new XMLHttpRequest();
    
    x.open("GET",'images.json',true);
    x.onload=function()
    {
        console.log(x.status);
        if(x.status==200)
        {
            var data=JOSN.parse(x.responseText);
            var arr=localStorage.getItem("imagedata");
            console.log(arr)
            console.log(data.images[0])

            for(i=0;i<data.images.length;i++)
            {
                var im=data.images[i]; 
                
                 var x=document.createElement('IMG');
                x.setAttribute("src",im.url);
                x.setAttribute("class","gallery"); 
                 container.appendChild(x);
            }
        }
    }
    x.send();
}

 
    data.images[0]=ima;
    console.log(data);


 <div class="container">
            <img src="img_1.jpg" class="gallery">
            <button class="btn1" onclick="deleteData()">Delete</button>
            <button class="btn2" onclick="editData()">Replace</button>
        </div>
        <div class="container">
        
            <img src="img_2.jpg" class="gallery">
            <button class="btn1">Delete</button>
            <button class="btn2">Replace</button>
        </div>
        <div class="container">
        
            <img src="img_3.jpg" class="gallery">
            <button class="btn1">Delete</button>
            <button class="btn2">Replace</button>
         </div>
         <div class="container">
         
            <img src="img_4.jpg" class="gallery">
            <button class="btn1">Delete</button>
            <button class="btn2">Replace</button>
        </div>

    
*/
function fetchfromjson()
{
fetch("images.json")
.then(response =>response.json())
.then(data => {
    //console.log(data);
    var imgdata=JSON.stringify(data);
    //console.log(imgdata)
    localStorage.setItem("sessionImages",imgdata);
    
});
}
var i=localStorage.getItem("sessionImages");
var imgData=JSON.parse(i);

if(i===null || imgData.images.length===0)
{
    fetchfromjson();
}

function loadImagesInGalleryAdmin()
{
    var rawData=localStorage.getItem("sessionImages");
   console.log(rawData);
   var data=JSON.parse(rawData);
   console.log(data.images)
   const container =document.querySelector("images");
   container.innerHTML='';  
    for(i=0;i<data.images.length;i++)
    {
       var im=data.images[i];
        var imagetext=
       "<div class='container1'><img src='"+im.url+"' class='gallery'>"+
       " <button class='btn1' data-name='"+im.name+"'>Delete</button>"+
        "<form action='updateform.html'><button class='btn2' data-name='"+im.name+"'>Replace</button></form>"
        +"</div>";
        container.innerHTML+=imagetext;
    }

    var addText="<div class='container1'>"+
    "<img src='add_image.jpg' class='gallery'>"+
    "<form action='imageform.html'><button class='btn3' >ADD IMAGE</button></form>"
    +"</div>"
    container.innerHTML+=addText;
    //event listeners to delete buttons
    deleteBtns=document.querySelectorAll(".btn1")
    deleteBtns.forEach(function (i) {
        i.addEventListener('click', function() {
          console.log("Delete : "+i.dataset.name);
          if(confirm("Do you wanna delete...Are you sure")===true)
          {
            deleteImage(i.dataset.name);
        }
    });
      });

    //event listeners to replace buttons
    replaceBtns=document.querySelectorAll(".btn2")
    replaceBtns.forEach(function (i) {
        i.addEventListener('click', function() {
          console.log("Replace : "+i);
          localStorage.setItem("replace",i.dataset.name);
        });
      });
    
      //event listeners to add image button
      //addbtn=document.getElementById("saveButton").addEventListener('click',addImage);

}
function loadImagesInGallery()
{
   var rawData=localStorage.getItem("sessionImages");
   console.log(rawData);
   var data=JSON.parse(rawData);
   console.log(data.images)
    for(i=0;i<data.images.length;i++)
    {
        const container =document.querySelector("images");
       var im=data.images[i]; 
        var x=document.createElement('IMG');
        x.setAttribute("src",im.url);
        x.setAttribute("class","gallery"); 
        container.appendChild(x);
    }

}

function addImage()
{
    var first=
            {
        "url":"https://image.shutterstock.com/image-photo/sunset-coast-lake-nature-landscape-260nw-1960131820.jpg",
        "name":"Fourth Image",
        "information":"",
        "uploadedDate":""
   }
   var imageurl=document.imageForm.imageurl.value;
   var name=document.imageForm.name.value;
   var info=document.imageForm.info.value;  
   var uploadDate=document.imageForm.upload.value;
   console.log(imageurl)
   
 //  var ima=JSON.stringify(first);
   var rawData=localStorage.getItem("sessionImages");
   var data=JSON.parse(rawData)
   var len=data.images.length
   data.images[len]=first;
   data.images[len].name=name;
   data.images[len].url=imageurl;
   data.images[len].information=info;
   data.images[len].uploadedDate=uploadDate;
    console.log(data)
   localStorage.setItem("sessionImages",JSON.stringify(data));
}

function deleteImage(name)
{
    var rawData=localStorage.getItem("sessionImages");
   var data=JSON.parse(rawData)
   var len=data.images.length
    for(i=0;i<len;i++)
   {
       if(data.images[i].name===name)
       {
            break;
        }
}
   index=i;
   console.log(index)
   var updatedData=data.images.slice(0,index).concat(data.images.slice(index+1,len));
   console.log(updatedData)
   data.images=updatedData
   console.log(data)
   localStorage.setItem("sessionImages",JSON.stringify(data))
   loadImagesInGalleryAdmin()
}

function editImage(index,imageurl,name,info,uploadDate)
{
    var rawData=localStorage.getItem("sessionImages");
   var data=JSON.parse(rawData)
   //var len=data.images.length
   data.images[index].name=name;
   data.images[index].url=imageurl;
   data.images[index].information=info;
   data.images[index].uploadedDate=uploadDate;
    console.log(data)
   localStorage.setItem("sessionImages",JSON.stringify(data));

}
