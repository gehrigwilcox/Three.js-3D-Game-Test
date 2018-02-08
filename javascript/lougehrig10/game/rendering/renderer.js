//RENDERER


//SETTINGS
var FOV = 60;
var NEAR = 0.1;
var FAR = 3000;

var MAX_HEIGHT = 300;



var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('gameCanvas'), antialias: true});

renderer.setClearColor(0,0,0,1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//FOV, aspect ratio, near, far
var camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, NEAR, FAR);


var scene = new THREE.Scene();



noise.seed(Math.random());



//how to render terrain
//u and v get values between 0 and 1
var terrainFunc = function (u, v) {
	
	var x = u * FAR; //we are trying to fill the whole screen with this plane
	
	var z = v * FAR; //we are trying to fill the whole screen with this plane
	
	//var y = Math.abs(noise.simplex2(u *5 /*- player.position.x*/, v *5/*- player.position.z*/)) * MAX_HEIGHT /*- player.position.y*/; //this will be a perlin noise function, taking in u and v with an offset of the players current x and z position
	

	var y = (noise.simplex2(u *5, v *5) * MAX_HEIGHT);

	console.log(y);

	//then we need to offset y by the players current y position
	
	return new THREE.Vector3(x, y, z); //then we return these values
}


//function, slices count, stack count (slices and stack are the resolution of u and v)
var terrain = new THREE.ParametricGeometry(terrainFunc, 100, 100);

var terrainMaterial = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
var terrainMesh = new THREE.Mesh(terrain, terrainMaterial);

terrainMesh.position.set(-FAR/2,-MAX_HEIGHT,-FAR/2);

scene.add(terrainMesh);




var geom = new THREE.CubeGeometry(100,100,100);
var material = new THREE.MeshBasicMaterial();
var mesh = new THREE.Mesh(geom, material);

mesh.position.set(0,-10,-1000)

scene.add(mesh);

var light = new THREE.PointLight(0xFFFFFF, 0.5);

//var light = new THREE.AmbientLight(0xFFFFFF, 0.5);

light.position.set(0,10,-100);

scene.add(light);




render();





function render(){

	moveCameraAround();

	terrain.verticesNeedUpdate = true;

	renderer.render(scene, camera);

	requestAnimationFrame(render);

}







//IMPORTANT:::::::: TODO: REMOVE THIS ONCE I CREATE THE "player"
//angle in radians
var angle = 0.0;

function moveCameraAround(){

	camera.position.set(FAR/2*Math.cos(angle),0,FAR/2*Math.sin(angle));

	camera.rotation.set(0,-angle+Math.PI/2,0);

	angle+=2*Math.PI/600;

	if(angle > 2*Math.PI) angle-=2*Math.PI;

}