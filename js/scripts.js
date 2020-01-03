var appID = "839c8d40";
var appKey = "e392afa31594c611a354ee7d1bad15cb";
var searchParam;

$(document).ready(function() {
    // displays navbar 
    $('#navbar').load('homecook-navbar.html');
    
    // displays results of a search
    $("form").submit(function(e) {
        e.preventDefault();
        $(".results > *").remove();
        searchParam = $(".search-bar").val();
        var url = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + searchParam;
        document.cookie = url;
        var container = document.createElement("div");
        $(container).addClass("container-fluid");
        $(container).appendTo("#results");
        $.get(url, function(res) {
            if (res.count == 0) {
                $(container).append("<h4>No results!</h4>");
            } else {
                $(container).append("<h4>Top 10 Results for <span>\"" + searchParam + "\"</span></h4>");
                var row = document.createElement("div");
                $(row).addClass("row");
                $(row).appendTo(container);
                for (var i = 0; i < res.hits.length; i++) {
                    var col = document.createElement("div");
                    $(col).addClass("col-lg-3");
                    $(col).appendTo(".row");
                    var recipeLink = document.createElement("a");
                    $(recipeLink).attr("href", "homecook-recipe.html?i=" + i);
                    $(recipeLink).addClass("recipe-link");
                    $(recipeLink).appendTo(col);
                    var card = document.createElement("div");
                    $(card).addClass("card");
                    $(card).appendTo(recipeLink);
                    var img = document.createElement("img");
                    $(img).addClass("card-img-top");
                    $(img).attr("src", res.hits[i].recipe.image);
                    $(img).appendTo(card);
                    var cardBody = document.createElement("div");
                    $(cardBody).addClass("card-body");
                    $(cardBody).appendTo(card);    
                    var cardTitle = document.createElement("h5");
                    $(cardTitle).addClass("card-title");
                    $(cardTitle).html(res.hits[i].recipe.label);
                    $(cardTitle).appendTo(cardBody);
                    var source = document.createElement("p");
                    $(source).html("From " + res.hits[i].recipe.source);
                    $(source).appendTo(cardBody);
                }
            }
        });
    });
    getRecipe();

    // loads recipe info
    function getRecipe() {
        var recipe;
        var label;
        var img;
        var source;
        var url;
        var ingredients;
        var urlParams = new URLSearchParams(window.location.search);
        var recipeNum = urlParams.get("i");
        $.get(document.cookie, function(res) {
            recipe = res.hits[recipeNum].recipe;
            label = recipe.label;
            img = recipe.image;
            source = recipe.source;
            ingredients = recipe.ingredients;
            url = recipe.url;
            var container = document.createElement("div");
            $(container).addClass("container");
            $(container).appendTo("#recipe");
            var header = document.createElement("div");
            $(header).addClass("header");
            $(header).appendTo(container);
            var recipeLabel = document.createElement("h1");
            $(recipeLabel).html(recipe.label);
            $(recipeLabel).appendTo(header);
            var recipeSource = document.createElement("p");
            $(recipeSource).html("From " + source);
            $(recipeSource).appendTo(header);
            var row = document.createElement("div");
            $(row).addClass("row");
            $(row).appendTo(container);
            var col1 = document.createElement("div");
            $(col1).addClass("col");
            $(col1).appendTo(row);
            var recipeIMG = document.createElement("img");
            $(recipeIMG).attr("src", recipe.image);
            $(recipeIMG).appendTo(col1);
            var col2 = document.createElement("div");
            $(col2).addClass("col ingredients");
            $(col2).appendTo(row);
            var ingredientsHeader = document.createElement("h4");
            $(ingredientsHeader).html("Ingredients");
            $(ingredientsHeader).appendTo(col2);
            for (var i = 0; i < ingredients.length; i++) {
                var ingredient = document.createElement("div");
                $(ingredient).addClass("form-check");
                var checkbox = document.createElement("input");
                $(checkbox).addClass("form-check-input");
                $(checkbox).attr("type", "checkbox");
                $(checkbox).attr("value", "");
                $(checkbox).attr("id", "check" + i);
                $(checkbox).appendTo(ingredient);
                var label = document.createElement("label");
                $(label).addClass("form-check-label");
                $(label).attr("for", "check" + i);
                $(label).html(ingredients[i].text);
                $(label).appendTo(ingredient);
                $(ingredient).appendTo(col2);
            }
            var btn = document.createElement("a");
            $(btn).addClass("btn btn-primary");
            $(btn).attr("href", recipe.url);
            $(btn).html("Instructions");
            $(btn).appendTo(container);
        });
    }
});