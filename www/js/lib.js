"use strict";

var baseurl = "http://52.28.252.9/";
//var baseurl = "http://127.0.0.1:5000/";

function api(call, callback){
	$.get({
	  url: baseurl + call,
	  success: callback
	});
}

function createUser(age,gender,firstname,lastname,dist, callback){
	var call = "create_user/"+age+"/"+gender+"/"+firstname+"/"+lastname+"/"+dist;
	api(call,callback);
}

function getUser(user_id,callback){
	var call = "user/"+user_id;
	api(call,callback);
}

function getRatings(user_id,callback){
	var call = "user/"+user_id;
	api(call,callback);
}

function updateUser(user_id,age,gender,firstname,lastname,dist, callback){
	var call = "update_user/"+user_id+"/"+age+"/"+gender+"/"+firstname+"/"+lastname+"/"+dist;
	api(call,callback);	
}

function rate(user_id,art_id,rating,callback){
	var call = "user/rate/"+user_id+"/"+art_id+"/"+rating;
	api(call,callback);
}

function closeObjects(user_id,latitude,longitude,max_dist,callback){
	var call = "objects/"+user_id+"/"+latitude+"/"+longitude+"/"+max_dist;
	api(call,callback);
}

function myMatches(user_id,callback){
	var call = "matches/"+user_id
	api(call,callback);
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return true;
        }
    }

    return false;
}
