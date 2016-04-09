"use strict";

var baseurl = "http://127.0.0.1:5000/";

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

function closeObjects(latitude,longitude,max_dist,callback){
	var call = "objects/"+latitude+"/"+longitude+"/"+max_dist;
	api(call,callback);
}

function myMatches(user_id,callback){
	var call = "matches/"+user_id
	api(call,callback);
}