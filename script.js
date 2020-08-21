//Calling the Specific Page.
function page(event){
    var page = event.target.innerHTML.toLowerCase();
    var sectionDiv = document.getElementById('section');
    sectionDiv.innerText = "";
    
    getData(page);
}

//To load page data
async function getData(page){

    var data = await (await fetch(`https://api.nytimes.com/svc/topstories/v2/${page}.json?api-key=xZrFIeI5FcAZ2uZ3HIZk5T5cTwHPqOl6`)).json();
    
    let results =  data.results;
    console.log(results);
    //Cards Creation
	for(let i = 0 ; i < 10 ; i++){

		var story = results[i];
		
        var sectionDiv = document.getElementById('section');
        

		var cardDiv = document.createElement("div");
		cardDiv.setAttribute("class","card  mb-3 ");

		var cardBodyDiv = document.createElement("div");
		cardBodyDiv.setAttribute("class","card-body");

		var cardBodyRowDiv = document.createElement("div");
		cardBodyRowDiv.setAttribute("class","row");

		var cardBodyRowCol8Div = document.createElement("div");
		cardBodyRowCol8Div.setAttribute("class","col-sm-8");

        var newsCategory = document.createElement("h5");
        newsCategory.innerHTML = story.section;
        newsCategory.classList = "card-title sectioncard";

		var storyTitle = document.createElement("h3");
		storyTitle.innerHTML = story.title;
        storyTitle.classList = "titlecard";

        var storyDate = document.createElement("h3");
        //Getting the preffered Date. [MON DATE]
        let dateObject = new Date(Date.parse(story.created_date));
        storyDate.innerText =  dateObject.toLocaleString('default', { month: 'short' }) + " " + dateObject.getDate();
        
        
        storyDate.className = "datecard";

		var storyAbstract = document.createElement("h3");
        storyAbstract.innerHTML = story.abstract;
        storyAbstract.className = "abstractcard";

        var continueReading = document.createElement("a");
        continueReading.className = "text-muted";
        continueReading.innerText = "continue Reading";
        continueReading.className = "continueReading";
        continueReading.href = story.short_url;
        cardBodyRowCol8Div.appendChild(newsCategory);
		cardBodyRowCol8Div.appendChild(storyTitle);
		cardBodyRowCol8Div.appendChild(storyDate);
        cardBodyRowCol8Div.appendChild(storyAbstract);
        cardBodyRowCol8Div.appendChild(continueReading);
        

		var cardBodyImgCol4Div = document.createElement("img");
		cardBodyImgCol4Div.setAttribute("class","col-sm-4 img-thumbnail");
		cardBodyImgCol4Div.setAttribute("src",story.multimedia[0].url);

		cardBodyRowDiv.appendChild(cardBodyRowCol8Div);
		cardBodyRowDiv.appendChild(cardBodyImgCol4Div);

		cardBodyDiv.appendChild(cardBodyRowDiv);

		cardDiv.appendChild(cardBodyDiv);

		sectionDiv.appendChild(cardDiv);
	}
}

getData('home');