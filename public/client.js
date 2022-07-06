// import * as THREE from '/build/three.module.js';
import * as THREE from 'three'
import Stats from './jsm/libs/stats.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

// import * as THREE from '/build/three.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
// import testVertextShaders from '/vertexShader.glsl'
// import testFragmentShaders from '/fragmentShader.glsl'
import { Points, TriangleFanDrawMode } from 'three'
import { TextureLoader } from 'three';
// import gsap from "/gsap"
// import src from 'gsap/src'

// Debug
// const gui = new dat.GUI()
// gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')



// texture

const texture = new THREE.TextureLoader()
const city3601 = texture.load('./images/city3.jpg')
const city3602 = texture.load('./images/city.jpg')
const galaxy = texture.load('./images/galaxy.jpg')
const city3603 = texture.load('./images/city2.jpg')
const tajmahal1 = texture.load('/images/tajmahal1.jpg')
const tajmahal2 = texture.load('./images/tajmahal2.jpg')
const tajmahal3 = texture.load('./images/tajmahal3.jpg')
const mumbai1 = texture.load('./images/mumbai1.jpg')
const mumbai2 = texture.load('./images/mumbai2.jpg')
const kutch1 = texture.load('./images/kutch1.jpg')
const kashmir1 = texture.load('./images/kashmir1.jpg')
const kerala1 = texture.load('./images/kerala1.jpg')
const goa1 = texture.load('./images/goa1.jpg')
const goa2 = texture.load('./images/goa2.jpg')
const goa3 = texture.load('./images/goa3.jpg')

const paris = texture.load('./images/paris4.jpg')
const france1 = texture.load('./images/france1.jpg')
const mountain1 = texture.load('./images/mountain1.jpg')
const museam1 = texture.load('./images/museam1.jpg')


// Scene
// const scene360 = new THREE.Scene()
// scene360.background = new THREE.Color('white')

const sceneplanet = new THREE.Scene()

// sceneplanet.background = galaxy

// sceneplanet.background = new THREE.Color('white')


// const sceneFinal = new THREE.Scene()
// sceneFinal.background = new THREE.Color('white')




let points = [

    {

        title: 'kyiv',
        coords: {

            lat: 22.309425,
            lng: 72.136230

        },

        textureplace: paris
    },

    {

        title: 'cancun',
        coords: {

            lat: 80.5937,
            lng: 18.9629

        },

        textureplace: france1


    },

    {

        title: 'paris',
        coords: {

            lat: 149.8566,
            lng: 26.3522

        },

        textureplace: mountain1


    },

    {

        title: 'kyiv',
        coords: {

            lat: 22.309425,
            lng: 72.136230

        },

        textureplace: museam1
    },

    {

        title: 'cancun',
        coords: {

            lat: 80.5937,
            lng: 18.9629

        },

        textureplace: goa1


    },

    {

        title: 'paris',
        coords: {

            lat: 149.8566,
            lng: 26.3522

        },

        textureplace: city3603


    },

    {

        title: 'kyiv',
        coords: {

            lat: 22.309425,
            lng: 72.136230

        },

        textureplace: mumbai1
    },

    {

        title: 'cancun',
        coords: {

            lat: 80.5937,
            lng: 18.9629

        },

        textureplace: city3602


    },



]

var t = null
var s = null
let list = null
let el = null

// group for scene360

const group = new THREE.Group()


// Objects



// console.log(points[1].texture)


// creating sceneplanet

let x = 0
let y = 0


// function createplanet() {

const geometryplanet = new THREE.SphereGeometry(1, 32, 32);

// Materials

const materialplanet = new THREE.MeshStandardMaterial({

    map: texture.load('./images/earth5.jpg')


})
// material.color = new THREE.Color(0xff0000)

// Mesh
const sphereplanet = new THREE.Mesh(geometryplanet, materialplanet)
group.add(sphereplanet)



document.addEventListener('mousemove', function (e) {

    x = e.clientX
    y = e.clientY

})

// for coors on earth



function calcposFromLatLonRad(lat, lon) {


    var phi = (lat) * (Math.PI / 100)
    var theta = (lon + 100) * (Math.PI / 100)
    let x = Math.cos(phi) * Math.cos(theta)
    let y = Math.cos(phi) * Math.sin(theta)
    let z = Math.sin(phi)
    return {
        x, y, z
    };


}



for (let i = 0; i < points.length; i++) {

    // console.log(points[i].textureplace)



    // ]

    // points.forEach((p,index) => {

    let coords = calcposFromLatLonRad(points[i].coords.lat, points[i].coords.lng)

    // console.log(coords)

    let meshcoords = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xcfff0ff })
    )
    meshcoords.position.copy(coords)

    // group.add(meshcoords)



    // gui.add(meshcoords.position,'x').min(0).max(4).step(0.1).name('x')
    // gui.add(meshcoords.position,'y').min(0).max(4).step(0.1).name('y')
    // gui.add(meshcoords.position,'z').min(0).max(4).step(0.1).name('z')


    // })


}


sceneplanet.add(group)



const particlescustomGeometry = new THREE.BufferGeometry()
const count = 2000

const positions = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {

    positions[i] = (Math.random() - 0.5) * 10
}

particlescustomGeometry.setAttribute(

    'position',
    new THREE.BufferAttribute(positions, 3)
)

// Materials

const particlesMaterial = new THREE.ShaderMaterial({

    // uniforms:
    // {

    //     uSize: { value: 100 }
    // },
    vertexShader: `
    
    
        void main(){
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);

        gl_PointSize = 23.0;



        }

    `,
    fragmentShader: `
    
        void main()
        {
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            float strength = 0.045 / distanceToCenter - 0.1  * 1.5;

            gl_FragColor = vec4(0.0, 1.0, 1.0, strength);
        }

    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false


})

particlesMaterial.color = new THREE.Color(0x00ff00)

// Mesh
// const particles = new THREE.Points(particlesGeometry,particlesMaterial)
const particles = new THREE.Points(particlescustomGeometry, particlesMaterial)
sceneplanet.add(particles)


// gui debug panel


// gui.add(material1.uniforms.progress, 'value').min(0).max(1).step(0.01).name('transition')


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.8)
pointLight.position.x = 7
pointLight.position.y = 3
pointLight.position.z = 6
sceneplanet.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


// texture360 & texctureplanet

let texture360 = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {

    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter

})

let textureplanet = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {

    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter

})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera1.aspect = sizes.width / sizes.height
    camera1.updateProjectionMatrix()

    camera2.aspect = sizes.width / sizes.height
    camera2.updateProjectionMatrix()

    camera3.aspect = sizes.width / sizes.height
    camera3.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera2 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera2.position.x = 0
camera2.position.y = 0
camera2.position.z = 2
group.add(camera2)


const controls2 = new OrbitControls(camera2, canvas)
controls2.enableDamping = true
controls2.enableZoom = false




let navbar = document.querySelector('#navbar')
let a = document.querySelectorAll('#navbar li a')
let ho1_h1 = document.querySelector('.first-h1')
let ho1_h12 = document.querySelector('.second-h1')
let about = document.getElementById('about')
let explorebtn = document.querySelectorAll('#btn-about')
let images = document.querySelectorAll('#img')
let imagememu = document.querySelector('.image-menu')
let imagesplaces = document.querySelectorAll('.imagesplaces')
let imageheading = document.querySelectorAll('.image1 .imgheading')
let close = document.querySelector('.image-menu .close')
let close_planeyourtourbtn = document.querySelector('.planeyourtour_btn .close_planeyourtourbtn')
let imgheading_P = ""
let img_p = ""
let view360_btn = document.querySelector('#about #btn-360')
let close360 = document.querySelector('.close360')
let planeyourtour = document.querySelector('#btn-placedetails')
let planeyourtourdetails = document.querySelector('#planeyourtour_btn')

let tourlink = document.querySelector('.tour_link')
let googlemap = document.querySelector('#btn-googlemap')
let whether = document.querySelector('#btn-whether')
let distancebtn = document.querySelector('#btn-distance')
// let loginpop = document.querySelector('.pop')
let close_googlebtn = document.querySelector('#map .close_googlebtn')
let close_whetherbtn = document.querySelector('#whether .close_whetherbtn')
let close_distancebtn = document.querySelector('#user_distance .close_distancebtn')


let historyheading = document.getElementById('history_heading')
let historyplace = document.getElementById('history')


// let about_section = document.getElementById('#about')
let home = document.getElementById('home')
let service_section = document.getElementById('services')
let contact_section = document.getElementById('contact')
let footer_main = document.getElementById('footer')


let city = document.querySelector('.locationplace1')
let state = document.querySelector('.locationplace2')
let country = document.querySelector('.locationplace3')


let showmap = document.querySelector('#map .showmap')
let showmap_3601 = document.querySelector('#map_360 .showmap_360')

let distancemap = document.querySelector('#user_distance')

let showwhether = document.querySelector('#whether .showwhether')
let footer = document.querySelector('.foot span')

let hotel_name1 = document.querySelector('#hotels .hotel_details .hotel_img .hotel1')
let hotel_name2 = document.querySelector('#hotels .hotel_details .hotel_img .hotel2')
let hotel_name3 = document.querySelector('#hotels .hotel_details .hotel_img .hotel3')

let hotel_img1 = document.querySelector('#hotels .hotel_detail .hote_img #img1')
let hotel_img2 = document.querySelector('#hotels .hotel_detail .hote_img #img2')
let hotel_img3 = document.querySelector('#hotels .hotel_detail .hote_img #img3')
let hotel_img4 = document.querySelector('#hotels .hotel_detail .hote_img #img4')
let hotel_img5 = document.querySelector('#hotels .hotel_detail .hote_img #img5')



// distancebtn.addEventListener('click', () => {

//     loginpop.style.opacity = 1
//     window.scrollTo(0, 0)
//     alert('please login');
//     // container1.style.transform = 'translateX(-50%) scale(1)'
//     container1.classList.add('active1')

// })


var sound_a = new Audio('./audio/a.mp3')
var sound_explorebtn = new Audio('./audio/a.mp3')
var sound_enter360btn = new Audio('./audio/enter360.wav')
var sound_exit360btn = new Audio('./audio/exit360.wav')

// login form

let login_form = document.querySelector('.button_login')
let container1 = document.querySelector('section .container1')

// login_form.addEventListener('click', function () {

//     container1.classList.toggle('active1')

//     let tl = gsap.timeline()

//     // tl.to('.container1.active1',{ scale:1,duration:1,ease:Expo.easeOut})


// })


//  360-details


let text_360_details = document.querySelectorAll('.text')

const raycaster = new THREE.Raycaster()
const point360 = [
    {
        position: new THREE.Vector3(1.55, 0.3, - 0.6),
        element: document.querySelector('.point-0')
    },
    {
        position: new THREE.Vector3(0.5, 0.8, - 1.6),
        element: document.querySelector('.point-1')
    },
    {
        position: new THREE.Vector3(1.6, - 1.3, - 0.7),
        element: document.querySelector('.point-2')
    },

    {
        position: new THREE.Vector3(0.9, - 0.8, -1.0),
        element: document.querySelector('.container .btn1')
    },

    {
        position: new THREE.Vector3(1.1, - 1.2, -0.89),
        element: document.querySelector('.container .btn2')
    },

    {
        position: new THREE.Vector3(-0.6, -0.3, 0.7),
        element: document.querySelector('.container .btn3')
    }
]




for (let i = 0; i < a.length; i++) {

    a[i].addEventListener('mouseenter', function () {

        sound_a.currentTime = 0
        sound_a.play()
        // console.log(sound_a)

    })

}





// search bar


// let search = document.getElementById('search')
// let search_btn = document.getElementById('search_btn')
// let searchtext = ""
// // let searcharray = []
// let searcharray = ""


// search.addEventListener('keypress', function (e) {




//     search_btn.addEventListener('click', function () {


//         searcharray = search.value
//         searchtext = searcharray.split("")


//     })

//     let searchtext = ""
//     let searcharray = ""
//     if (searchtext == e.key) {

//         search.innerText = searchtext

//     }


// })


// function autocomplete(inp, arr) {
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;
//     /*execute a function when someone writes in the text field:*/

//     search_btn.addEventListener('click', function () {

//         for (let i = 0; i < imageheading.length; i++) {


//             // let searchtext = ""


//             // console.log(inp.value)
//             // console.log(imageheading[i].textContent)

//             if (imageheading[i].textContent == inp.value) {

//                 //    searchtext = imageheading[i]

//                 //    console.log(searchtext)


//                 t = points[i].textureplace



//                 // console.log(points[index].textureplace,index)

//                 console.log(t)




//                 // creating scene360

//                 // function create360() {

//                 const geometry360 = new THREE.SphereGeometry(1, 32, 32);

//                 // Materials

//                 const material360 = new THREE.MeshBasicMaterial({

//                     map: t,
//                     side: THREE.BackSide

//                 })

//                 // tl.from(material1.uniforms.value,{ duration : 1})
//                 // material.color = new THREE.Color(0xff0000)

//                 // Mesh
//                 const sphere360 = new THREE.Mesh(geometry360, material360)
//                 scene360.add(sphere360)


//                 // }




//                 imgheading_P = document.createElement('div')
//                 img_p = document.createElement('img')
//                 img_p.id = 'img'
//                 img_p.setAttribute('alt', imageheading[i].textContent)
//                 img_p.src = images[i].src
//                 imgheading_P.className = 'imgheading'
//                 imgheading_P.innerText = imageheading[i].textContent
//                 imagememu.appendChild(img_p)
//                 imagememu.appendChild(imgheading_P)



//                 let tl = gsap.timeline()

//                 tl.to('.image-menu', {

//                     opacity: 1,
//                     scale: 1,
//                     duration: 0.5,
//                     ease: Expo.easeOut


//                 })


//                 console.log(imagememu)


//             }






//         }



//         window.scrollTo(0, 800)



//     })


//     close.addEventListener('click', function () {

//         let tl = gsap.timeline()

//         tl.to('.image-menu', {

//             opacity: 0,
//             scale: 0,
//             duration: 0.5,
//             ease: Expo.easeOut


//         })

//         let imgh = document.querySelectorAll('.imgheading')

//         for (let i = 0; i < imgh.length; i++) {


//             // imgheading_P = document.createElement('div')
//             // img_p = document.createElement('img')
//             // img_p.id = 'img'
//             // img_p.removeAttribute('alt', "")
//             // img_p.src = ""
//             // imgheading_P.className = 'imgheading'
//             imgheading_P.innerText = ""
//             // imagememu.appendChild(img_p)
//             imagememu.appendChild(imgheading_P)

//             // imgh[i].innerText = "" 
//             // console.log(imgh[i].innerText)

//         }

//     })





//     inp.addEventListener("input", function (e) {
//         var a, b, i, val = this.value;
//         /*close any already open lists of autocompleted values*/
//         closeAllLists();
//         if (!val) { return false; }
//         currentFocus = -1;
//         /*create a DIV element that will contain the items (values):*/
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");
//         /*append the DIV element as a child of the autocomplete container:*/
//         this.parentNode.appendChild(a);
//         /*for each item in the array...*/
//         for (i = 0; i < arr.length; i++) {
//             /*check if the item starts with the same letters as the text field value:*/
//             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//                 /*create a DIV element for each matching element:*/
//                 b = document.createElement("DIV");
//                 /*make the matching letters bold:*/
//                 b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//                 b.innerHTML += arr[i].substr(val.length);
//                 /*insert a input field that will hold the current array item's value:*/
//                 b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//                 /*execute a function when someone clicks on the item value (DIV element):*/
//                 b.addEventListener("click", function (e) {
//                     /*insert the value for the autocomplete text field:*/
//                     inp.value = this.getElementsByTagName("input")[0].value;
//                     /*close the list of autocompleted values,
//                     (or any other open lists of autocompleted values:*/
//                     closeAllLists();
//                 });
//                 a.appendChild(b);
//             }
//         }
//     });
//     /*execute a function presses a key on the keyboard:*/
//     inp.addEventListener("keydown", function (e) {
//         var x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//             /*If the arrow DOWN key is pressed,
//             increase the currentFocus variable:*/
//             currentFocus++;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode == 38) { //up
//             /*If the arrow UP key is pressed,
//             decrease the currentFocus variable:*/
//             currentFocus--;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode == 13) {
//             /*If the ENTER key is pressed, prevent the form from being submitted,*/
//             e.preventDefault();
//             if (currentFocus > -1) {
//                 /*and simulate a click on the "active" item:*/
//                 if (x) x[currentFocus].click();
//             }
//         }
//     });
//     function addActive(x) {
//         /*a function to classify an item as "active":*/
//         if (!x) return false;
//         /*start by removing the "active" class on all items:*/
//         removeActive(x);
//         if (currentFocus >= x.length) currentFocus = 0;
//         if (currentFocus < 0) currentFocus = (x.length - 1);
//         /*add class "autocomplete-active":*/
//         x[currentFocus].classList.add("autocomplete-active");
//     }
//     function removeActive(x) {
//         /*a function to remove the "active" class from all autocomplete items:*/
//         for (var i = 0; i < x.length; i++) {
//             x[i].classList.remove("autocomplete-active");
//         }
//     }
//     function closeAllLists(elmnt) {
//         /*close all autocomplete lists in the document,
//         except the one passed as an argument:*/
//         var x = document.getElementsByClassName("autocomplete-items");
//         for (var i = 0; i < x.length; i++) {
//             if (elmnt != x[i] && elmnt != inp) {
//                 x[i].parentNode.removeChild(x[i]);
//             }
//         }
//     }
//     /*execute a function when someone clicks in the document:*/
//     document.addEventListener("click", function (e) {
//         closeAllLists(e.target);
//     });
// }

/*An array containing all the country names in the world:*/
// //   var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
// // var countries = ["tajmahal", "kutch", "kashmir", "kerala", "goa", "dargiling", "mumbai", "manali"]
// var countries = ["paris", "Arc de Triomphe", "Le mont saint michel", "Museum de louvre"]

// /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
// autocomplete(document.getElementById("search"), countries);




// searcharray = searcharray.split("")


// searcharray.slice(0,3)
// console.log(searcharray)

// console.log(search)

// let imagemenuheading = document.querySelectorAll('.image-menu .imgheading')



for (let i = 0; i < images.length; i++) {

    images[0].src = "https://images.unsplash.com/photo-1634007626524-f47fa37810a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    images[1].src = "https://images.unsplash.com/photo-1599743777555-e362a2feab39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
    images[2].src = "https://images.unsplash.com/photo-1627309351963-3f35604ba036?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    images[3].src = "https://images.unsplash.com/photo-1533682805518-48d1f5b8cd3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    images[4].src = "https://images.unsplash.com/photo-1601225612316-b4733315a717?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
    images[5].src = "https://images.unsplash.com/photo-1595740229246-cfdda61917c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
    images[6].src = "https://images.unsplash.com/photo-1610361418971-50cb8d1f8339?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    images[7].src = "https://images.unsplash.com/photo-1597148543182-830ef7bbb904?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0cm9uYXMlMjB0d2luJTIwdG93ZXJzJTJDJTIwa3VhbGElMjBsdW1wdXIlMkMlMjBtYWxheXNpYXxlbnwwfHwwfHw%3D&w=1000&q=80"
    // console.log(images[i])

}


// for (let i = 0; i < imageheading.length; i++) {

//     // console.log(imageheading[i])


// }


let mapdetails = [

    {

        maplink: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.6509103882!2d54.94756079980422!3d25.075759466369252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1649053074059!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`


    },

    {

        maplink: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.2643984167635!2d55.174321415364396!3d25.228018183881893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f40e14e62489d%3A0x14765d38d4260134!2sOman!5e0!3m2!1sen!2sin!4v1649053271253!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`


    },
    {

        maplink: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227126.43245751093!2d33.641626339051946!3d27.19243494215605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145287b2cd3dbbb3%3A0x2db807f98bd3c360!2sHurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sin!4v1649053288644!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`


    },
    {

        maplink: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236161.63669411905!2d113.98761552895749!3d22.35266321649334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403e2eda332980f%3A0xf08ab3badbeac97c!2sHong%20Kong!5e0!3m2!1sen!2sin!4v1649053342720!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`


    },
    {

        maplink: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7961711.162434597!2d96.99432710095184!3d13.00033557731568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1649053363495!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`


    },
    {

        maplink: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424143.2712257341!2d150.6517920218739!3d-33.84792704425818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sin!4v1649053397458!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`


    },
    {

        maplink: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.400553850172!2d78.03995351539882!3d27.175144783015348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121d702ff6d%3A0xdd2ae4803f767dde!2sTaj%20Mahal!5e0!3m2!1sen!2sin!4v1649053429588!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`


    },
    {

        maplink: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8149950.39157676!2d105.12151210101715!3d4.1279329973111425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3034d3975f6730af%3A0x745969328211cd8!2sMalaysia!5e0!3m2!1sen!2sin!4v1649053463327!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`


    }

]




let mapdetails_360 = [

    {

        maplink_360: `<iframe src="https://www.google.com/maps/embed?pb=!4v1648981018168!6m8!1m7!1sJxg-nWHoBjEjmB7Yp73iMw!2m2!1d25.19399086282802!2d55.27409539751477!3f357.5779251017624!4f2.38572725323651!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id ="full_360"></iframe>`


    },

    {

        maplink_360: `<iframe src="https://www.google.com/maps/embed?pb=!4v1648981192577!6m8!1m7!1sCAoSLEFGMVFpcE50NUtiZW4xejZsci1ZeDYyMGtKQkY5cDFidVFLRVpYTUs2Y0lB!2m2!1d23.5846833!2d58.38999070000001!3f136.30364828156823!4f-10.423838106365835!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id ="full_360"></iframe>`


    },
    {

        maplink_360: `<iframe src="https://www.google.com/maps/embed?pb=!4v1648981527994!6m8!1m7!1sCAoSLEFGMVFpcE5XTl9vbzRIWDdVeTZQd3FVVGRjVjJFeWJ6STB5LVc1MnJTSi04!2m2!1d27.2080936!2d33.9267273!3f215.8989272256358!4f2.1523777764355856!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id ="full_360"></iframe>`


    },
    {

        maplink_360: `<iframe src="https://www.google.com/maps/embed?pb=!4v1648980661974!6m8!1m7!1sCAoSLEFGMVFpcE8wdHVhQWhlN0QyQUtlMEF3bHB1ZTB3MWgwZUUtUmRYZV9zZ2No!2m2!1d22.3129666!2d114.0412819!3f15.792394284163663!4f3.975325838964551!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id ="full_360"></iframe>`


    },
    {

        maplink_360: `<iframe src="https://www.google.com/maps/embed?pb=!4v1648980939897!6m8!1m7!1sCAoSLEFGMVFpcE15UU00NmE2eDRuWDI4dXFVbWk4QThLSXhhSEo5NjBoVXpfVnBZ!2m2!1d9.576431911120165!2d99.93262767791748!3f293.19494604363916!4f-7.119042087812346!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id ="full_360"></iframe>`


    },
    {

        maplink_360: `<iframe src="https://www.google.com/maps/embed?pb=!4v1648980210349!6m8!1m7!1sCAoSLEFGMVFpcFBxQVZ4c3BfQjhBS2FCMGxyakhyMTNTdUFJelNZRFFBTk84OG82!2m2!1d-33.8688197!2d151.2092955!3f348.7676333404718!4f4.868026756123882!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id ="full_360"></iframe>`


    },
    {

        maplink_360: `<iframe src="https://www.google.com/maps/embed?pb=!4v1648980413162!6m8!1m7!1sCAoSLEFGMVFpcE1RalViaE9JeXZjYW51djhlQzRKQ2cwaVRvNzVxLUlZaGg0U09J!2m2!1d27.17544932950533!2d78.04324396424738!3f114.40881591539491!4f-4.493817567274121!5f0.4000000000000002" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id ="full_360"></iframe>`


    },
    {

        maplink_360: `<iframe src="https://www.google.com/maps/embed?pb=!4v1648980320765!6m8!1m7!1sCAoSLEFGMVFpcFBoMUxLcENhMHlDOWNEM1hHV2poZ3JBU1NiNHpsQ09DbzQ4ZWJI!2m2!1d3.1587497!2d101.7110231!3f10.073859081296007!4f18.361207620686443!5f0.4000000000000002" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" id ="full_360"></iframe>`


    }

]





let whetherdetails = [

    {


        whetherlink: `<a class="weatherwidget-io" href="https://forecast7.com/en/27d1878d01/agra/" style="width:500px" data-label_1="AGRA" data-label_2="WEATHER" data-theme="original" >AGRA WEATHER</a>

        <script>
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
        </script>
        `

    },
    {


        whetherlink: `<a class="weatherwidget-io" href="https://forecast7.com/en/23d7369d86/kutch/" style="width:500px" data-label_1="KUTCH" data-label_2="WEATHER" data-theme="original" >KUTCH WEATHER</a>
        <script>
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
        </script>`

    },
    {


        whetherlink: `<a class="weatherwidget-io" href="https://forecast7.com/en/33d7876d58/jammu-and-kashmir/" style="width:500px" data-label_1="JAMMU AND KASHMIR" data-label_2="WEATHER" data-theme="original" >JAMMU AND KASHMIR WEATHER</a>
        <script>
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
        </script>`

    },
    {


        whetherlink: `<a class="weatherwidget-io" href="https://forecast7.com/en/10d8576d27/kerala/" style="width:500px" data-label_1="KERALA" data-label_2="WEATHER" data-theme="original" >KERALA WEATHER</a>
        <script>
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
        </script>`

    },
    {


        whetherlink: `<a class="weatherwidget-io" href="https://forecast7.com/en/15d3074d12/goa/" style="width:500px" data-label_1="GOA" data-label_2="WEATHER" data-theme="original" >GOA WEATHER</a>
        <script>
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
        </script>`

    },
    {


        whetherlink: `<a class="weatherwidget-io" href="https://forecast7.com/en/27d0488d26/darjeeling/" style="width:500px data-label_1="DARJEELING" data-label_2="WEATHER" data-theme="original" >DARJEELING WEATHER</a>
        <script>
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
        </script>`

    },
    {


        whetherlink: `<a class="weatherwidget-io" href="https://forecast7.com/en/19d0872d88/mumbai/" style="width:500px data-label_1="MUMBAI" data-label_2="WEATHER" data-theme="original" >MUMBAI WEATHER</a>
        <script>
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
        </script>`

    },
    {


        whetherlink: `<a class="weatherwidget-io" href="https://forecast7.com/en/32d2477d19/manali/" style="width:500px data-label_1="MANALI" data-label_2="WEATHER" data-theme="original" >MANALI WEATHER</a>
        <script>
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
        </script>`

    },

]

let tour_url = [


    {
        tour_link: "http://localhost/phptravels/en/usd/hotels/dubai/09-05-2022/10-05-2022/1/2/0/IN"
    },

    {
        tour_link: "http://localhost/phptravels/en/usd/hotels/singapore/09-05-2022/10-05-2022/1/2/0/IN"
    },

    {
        tour_link: "http://localhost/phptravels/en/usd/hotel/dubai/hyatt-regency-perth/38/09-05-2022/10-05-2022/1/2/0/1/IN/IN/0"
    },

    {
        tour_link: "http://localhost/phptravels/en/usd/hotels/hurghada/09-05-2022/10-05-2022/1/2/0/IN"
    },

    {
        tour_link: "http://localhost/phptravels/en/usd/hotels/thailand/09-05-2022/10-05-2022/1/2/0/IN"
    },

    {
        tour_link: "http://localhost/phptravels/en/usd/hotels/sydney/09-05-2022/10-05-2022/1/2/0/IN"
    },

    {
        tour_link: "http://localhost/phptravels/en/usd/hotel/dubai/madinah-moevenpick-hotel/31/09-05-2022/10-05-2022/1/2/0/1/IN/IN/0"
    },

    {
        tour_link: "http://localhost/phptravels/en/usd/hotel/singapore/swissotel-le-plaza-basel/39/09-05-2022/10-05-2022/1/2/0/1/IN/IN/0"
    }


]

let history_box = [

    {

        history_heading: 'dubai',
        history_place: 'Dubai, also spelled Dubayy, constituent emirate of the United Arab Emirates (formerly Trucial States or Trucial Oman). The second most populous and second largest state of the federation (area 1,510 square miles [3,900 square km]), it is roughly rectangular, with a frontage of about 45 miles (72 km) on the Persian Gulf. The emirate’s capital, also named Dubai, is the largest city of the federation. The city is located on a small creek in the northeast part of the state.'

    },

    {

        history_heading: 'oman',
        history_place: 'Oman is the oldest independent state in the Arab world. By the 18th century, the Omani Empire stretched from present day Oman down the east coast of Africa. A new era began in 1970 when Sultan Qaboos bin Said changed the name of the country from the Sultanate of Muscat and Oman to simply Oman.'

    },

    {

        history_heading: 'hurghada',
        history_place: 'Hurghada first emerged as a settlement of significance in 1909, when British geologists discovered oil reserves nearby. For decades oil—as well as fishing—drove the small Egyptian towns economy. Today, it is a major resort city, part of a transformation along the Red Sea coast.'

    },

    {

        history_heading: 'hong kong',
        history_place: 'The First Opium War which ensued lasted from 1839 to 1842. Britain occupied the island of Hong Kong on 25 January 1841 and used it as a military staging point. China was defeated and was forced to cede Hong Kong in the Treaty of Nanking signed on 29 August 1842. The island became a Crown Colony of the British Empire.'

    },

    {

        history_heading: 'thailand',
        history_place: 'Thailand was allied with Japan in the Second World War and Phibun was forced to resign in 1944, but he returned to power with military backing in 1948 and the army ran Thailand with support from the US. Phibun was finally ousted by rivals in 1957. He retreated to Japan and died there at the age of 66 in 1964.'

    },

    {

        history_heading: 'sydney',
        history_place: 'Sydney is named after Lord Sydney, who was British home secretary when Captain Arthur Phillip and the First Fleet arrived in January 1788. In a letter, Phillip described the colony in Sydney Cove as having “the finest harbour in the world” in which “a thousand sail of the line may ride in the most perfect security”.'

    },

    {

        history_heading: 'tajmahal',
        history_place: 'It was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal with construction starting in 1632 AD and completed in 1648 AD, with the mosque, the guest house and the main gateway on the south, the outer courtyard and its cloisters were added subsequently and completed in 1653 AD.'

    },

    {

        history_heading: 'malesiya',
        history_place: 'Malaysia’s history is said to have started from the Sultanate of Malacca which was around 1400 AD. At the time of its glory, the Sultanate Territories covered most of the East Coast of Peninsular Malaysia and Sumatra. Malacca emerged as a glorious Government because of its strategic location which was the meeting point between East Asia and the Middle East. This situation allowed Malacca to emerge as a major trading center for spice trade, especially in Southeast Asia. Islam was the main religion which emerged and became the main religion of the residents because the Ruler himself had professed the religion.'

    },



]



!function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id; js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, 'script', 'weatherwidget-io-js');



for (let i = 0; i < explorebtn.length; i++) {


    explorebtn[i].addEventListener('mouseenter', function () {

        sound_explorebtn.currentTime = 0
        sound_explorebtn.play()

    })

    explorebtn[i].addEventListener('click', function () {







        t = points[i].textureplace




        let tl = gsap.timeline()

        tl.to('.image-menu', {

            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: Expo.easeOut


        })

        // adding google map in web

        showmap.innerHTML = mapdetails[i].maplink
        showmap_3601.innerHTML = mapdetails_360[i].maplink_360
        showwhether.innerHTML = whetherdetails[i].whetherlink
        historyheading.innerHTML = history_box[i].history_heading
        historyplace.innerHTML = history_box[i].history_place


        tourlink.href = tour_url[i].tour_link


        // console.log(showwhether)
        // console.log(mapdetails[i].maplink)




        imgheading_P = document.createElement('div')
        img_p = document.createElement('img')
        img_p.id = 'img'
        img_p.setAttribute('alt', imageheading[i].textContent)
        img_p.src = images[i].src
        imgheading_P.className = 'imgheading'
        imgheading_P.innerText = imageheading[i].textContent
        imagememu.appendChild(img_p)
        imagememu.appendChild(imgheading_P)





    })


    planeyourtour.addEventListener('click', function () {

        // }


        tourlink.href[0] = tour_url[0].tour_link
        tourlink.href[1] = tour_url[1].tour_link
        tourlink.href[2] = tour_url[2].tour_link
        tourlink.href[3] = tour_url[3].tour_link
        tourlink.href[4] = tour_url[4].tour_link
        tourlink.href[5] = tour_url[5].tour_link
        tourlink.href[6] = tour_url[6].tour_link
        tourlink.href[7] = tour_url[7].tour_link

        console.log(tourlink)

        // imgheading_P = document.createElement('div')
        // img_p = document.createElement('img')
        // img_p.id = 'img'
        // img_p.setAttribute('alt', imageheading[i].textContent)
        // img_p.src = images[i].src
        // imgheading_P.className = 'imgheading'
        // imgheading_P.innerText = imageheading[i].textContent
        // imagememu.appendChild(img_p)
        // imagememu.appendChild(imgheading_P)


        // console.log(imgheading_P)
        //    console.log(imageheading[i])

    })

}



close.addEventListener('click', function () {

    let tl = gsap.timeline()

    tl.to('.image-menu', {

        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: Expo.easeOut


    })


    // sound_explorebtn.currentTime = 0
    // sound_explorebtn.play()

    let imgh = document.querySelectorAll('.imgheading')

    for (let i = 0; i < imgh.length; i++) {


        // imgheading_P = document.createElement('div')
        // img_p = document.createElement('img')
        // img_p.id = 'img'
        // img_p.removeAttribute('alt', "")
        // img_p.src = ""
        // imgheading_P.className = 'imgheading'
        showmap.innerHTML = ""
        showmap_3601.innerHTML = ""
        showwhether.innerHTML = ""
        imgheading_P.innerText = ""
        // imagememu.appendChild(img_p)
        imagememu.appendChild(imgheading_P)
        // scene360.remove(text360[i])
        // imgh[i].innerText = "" 
        // console.log(imgh[i].innerText)

    }

})


view360_btn.addEventListener('click', function () {


    let tl = gsap.timeline()

    tl.to('#map_360', {


        scale: 1,
        opacity: 1,
        duration: 1,
        ease: Expo.easeInOut
    })

    tl.to('.close360', {


        scale: 1,
        opacity: 1,
        duration: 1,
        ease: Expo.easeInOut

    })




})


close360.addEventListener('click', function () {

    // contact_section.style.opacity = '1'
    // service_section.style.opacity = '1'
    // about.style.opacity = '1'
    // footer_main.style.opacity = '1'

    // sound_exit360btn.play()
    // sound_exit360btn.currentTime = 0

    let tl = gsap.timeline()


    tl.to('#map_360', {


        scale: 0,
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })

    tl.to('.close360', {


        scale: 0,
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })




})





// google map

const success = (position) => {

    console.log(position)

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    const urllocaton = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

    fetch(urllocaton).then(res => res.json()).then(data => {

        console.log(data)
        city.innerText = data.locality
        state.innerText = data.principalSubdivision
        country.innerText = data.countryName


    })

    // initialize services



    // const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    // build request
    const origin1 = { lat: 55.93, lng: -3.118 };
    const origin2 = "Greenwich, England";
    const destinationA = "Stockholm, Sweden";
    const destinationB = { lat: 50.087, lng: 14.421 };
    const request = {
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    };
    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
        // put response
        let dis = JSON.stringify(
            response,
            null,
            2
        );

        console.log(dis)

    })

}

const error = (error) => {

    console.log(error)

}

navigator.geolocation.getCurrentPosition(success, error)

// function myMap() {
//     var mapProp = {
//         center: new google.maps.LatLng(51.508742, -0.120850),
//         zoom: 5,
//     };
//     var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }



googlemap.addEventListener('click', function () {





    // }

    let tl = gsap.timeline()

    tl.to('#map', {

        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: Expo.easeOut


    })

    // imgheading_P = document.createElement('div')
    // img_p = document.createElement('img')
    // img_p.id = 'img'
    // img_p.setAttribute('alt', imageheading[i].textContent)
    // img_p.src = images[i].src
    // imgheading_P.className = 'imgheading'
    // imgheading_P.innerText = imageheading[i].textContent
    // imagememu.appendChild(img_p)
    // imagememu.appendChild(imgheading_P)


    // console.log(imgheading_P)
    //    console.log(imageheading[i])

})


close_googlebtn.addEventListener('click', function () {

    let tl = gsap.timeline()

    tl.to('#map', {

        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: Expo.easeOut


    })

})


distancebtn.addEventListener('click', function () {





    // }

    let tl = gsap.timeline()

    tl.to('#user_distance', {

        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: Expo.easeOut


    })

    // imgheading_P = document.createElement('div')
    // img_p = document.createElement('img')
    // img_p.id = 'img'
    // img_p.setAttribute('alt', imageheading[i].textContent)
    // img_p.src = images[i].src
    // imgheading_P.className = 'imgheading'
    // imgheading_P.innerText = imageheading[i].textContent
    // imagememu.appendChild(img_p)
    // imagememu.appendChild(imgheading_P)


    // console.log(imgheading_P)
    //    console.log(imageheading[i])

})


close_distancebtn.addEventListener('click', function () {

    let tl = gsap.timeline()

    tl.to('#user_distance', {

        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: Expo.easeOut


    })

})


// whether.addEventListener('click', function () {





//     // }

//     let tl = gsap.timeline()

//     tl.to('#whether', {

//         opacity: 1,
//         scale: 1,
//         duration: 0.5,
//         ease: Expo.easeOut


//     })

//     // imgheading_P = document.createElement('div')
//     // img_p = document.createElement('img')
//     // img_p.id = 'img'
//     // img_p.setAttribute('alt', imageheading[i].textContent)
//     // img_p.src = images[i].src
//     // imgheading_P.className = 'imgheading'
//     // imgheading_P.innerText = imageheading[i].textContent
//     // imagememu.appendChild(img_p)
//     // imagememu.appendChild(imgheading_P)


//     // console.log(imgheading_P)
//     //    console.log(imageheading[i])

// })


// close_whetherbtn.addEventListener('click', function () {

//     let tl = gsap.timeline()

//     tl.to('#whether', {

//         opacity: 0,
//         scale: 0,
//         duration: 0.5,
//         ease: Expo.easeOut


//     })

// })



let footer_year = new Date().getFullYear()

footer.innerHTML = footer_year





// whether


//   console.log(images)


// animate using gsap

let tl = gsap.timeline()
tl.from(group.position, { z: 30, x: -23, ease: Expo.easeInOut, duration: 3 })
// tl.from(sphereplanet.rotation, { z: 8, y: 20, x: 10, ease: Expo.easeOut, duration: 2 }, '-=1.5')
// tl.to(group.position, { z: 0.5, ease: Expo.easeOut, duration: 2 }, '+=0.5')
// tl.from(particles.position, { z: 10, ease: Expo.easeInOut, duration: 3 }, "-=6")
// tl.to(directionalLight.position, { x:-20,y:-20, ease: Expo.easeOut,duration:5 })  
tl.from(ho1_h1, { opacity: 0, y: -50, duration: 1.5, ease: Expo.easeOut })
tl.from(ho1_h12, { opacity: 0, y: -40, duration: 1.5, ease: Expo.easeOut }, '-=0.8')
tl.from(a, { opacity: 0, y: -60, duration: 1.5,stagger: 0.2, ease: Expo.easeOut }, '-=1.3')
tl.from('.logo', { opacity: 0, x: -60, duration: 1.5, ease: Expo.easeOut }, '-=1.2')




document.body.addEventListener('load', () => {

    tl.play();


})


/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls1.update()
    controls2.update()
    // controls3.update()

    // animate

    particles.position.x = 0.45 + x * .00008;
    particles.position.y = 0.45 + y * .00008;

    sphereplanet.rotation.x = (0.45 + x * .00009);
    group.rotation.y = (0.45 + y * .00009);


    particles.rotation.y = - (0.1 * elapsedTime)
    sphereplanet.rotation.y = 0.1 * elapsedTime





    renderer.render(sceneplanet, camera2)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()