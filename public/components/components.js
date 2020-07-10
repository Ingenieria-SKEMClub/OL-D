/*  
        .d88888b      dP     dP  88888888b  8888ba.88ba     a88888b.    dP                      dP       
        88.           "'  88   .d8'  88                88  `8b  `  8b   d8'       `88    88                      88       
        `Y88888b. 88a8P'      88aaaa        88   88      88   88                 88   dP        dP   88d888b. 
            `     8b   88   `8b.  88                 88   88      88   88                 88   88        88    88'       `88 
        d8'      .8P 88     88  88                  88   88      88   Y8.        .88  88   88.  .    88    88.        .88 
        Y88888P  dP     dP  88888888P   dP   dP      dP    Y88888P'    dP    `88888P'     88Y8888'  
*/

/* 
    ¿Want to take a look to the code? We got you covered! 
    Take it from here: https://github.com/Ingenieria-SKEMClub/OL-D
*/

/* 
    Developed by Sebastián André López Corrales. 🍣
    Mantained by Fabián Mauricio Mena Garro.🍌
*/

/* 
    DISCLAIMER: The images of the people used in the real production app are not published to GitHub in order to protect
    the images and integrity of the people involved on the project. Have fun reading the code. 🔥
*/

/* App React components ⚛️ */
// Component for go back buttons.
class BackButton extends React.Component {
    constructor(props){
        super(props);
        /* 
            Props for this component: 
                place = where the back button should go back.
                name  = what name should the back button send to the gallery.
                number = what is the id number of the gallery.
        */
        this.state = {
            class: "bB1" // Class for the style between gallery and old photo back button.
        };
    };
    // Function to render the last component based on the property place. 
    goBack(){
        switch(this.props.place){
            case "Specialties": // In case we have to go back to specialties, we render that component.
                ReactDOM.render(<Specialties/>, document.getElementById('app'));
            break;
            case "Gallery": // In case we have to go back to the gallery, we render the gallery with its required properties.
                window.scrollTo(0,0); // Push back the scroll to the top.
                ReactDOM.render(<Gallery specialty={this.props.name} id={this.props.number} />,document.getElementById("app"));
            break;
        };
    };
    componentDidMount(){
        // Depending on that place it goes back, it selects the style and changes the state.
        switch(this.props.place){
            case "Specialties":
                this.setState({
                    class: "bB1"
                });
            break;
            case "Gallery":
                this.setState({
                    class: "bB2"
                });
            break;
        };
    };
    render(){
        return(
            // Renders a back button with a style based on what place should the button go back to.
            <button className={'backButtonStyle '+this.state.class} onClick={() => this.goBack()}>
                Volver 
            </button>
        );
    };
};
// Component for old picture showoff.
class Old extends React.Component{
    constructor(props){
        super(props);
        /* 
            Props for this component:
                title = the name of the person showing up.
                name = specialty name that the person corresponds to.
                folder = Id number of the specialty that the person corresponds to.
                person = id of the person (based on its image id) that should be render on the image.
        */
    };
    render(){
        return (
            /* 
                Renders a container that shows the name of the person, the recent image, the old image and renders a 
                back button component with "place" set as Gallery so the BackButton component can know where to go back.
            */
           <div className='oldContainer'>
                <h1 class='oldName'>
                    {this.props.title}
                    <br/>
                </h1>
                <div className='new'>
                    <img className='new personImageOld' src={"components/images/"+this.props.folder+"/"+this.props.person+".jpg"}></img>
                    <br/>
                    <BackButton name={this.props.name}  number={this.props.folder} place="Gallery"/>
                </div>
                <div className='oldContainer'>
                    <img className='old' src={"components/images/"+this.props.folder+"/"+this.props.person+"N.jpg"}></img>
                </div>
           </div>
        );
    };
};
// Component for specialty title showoff.
class Title extends React.Component {
    constructor(props){
        super(props);
        /*
            Props for this component:
                color = the hexacolor code that should be used for the title.
                title = the specialty name that should be rendered.
        */
    };
    render(){
        return(
            // Title that will be rendered with content and color based on the specialty selected.
            <h1 className='specialtyName'  style={{color: this.props.color}}>
                {this.props.title} 
                <BackButton place='Specialties' />
            </h1>
        );
    };
};
// Component for the image of the person in the gallery.
class ImageGallery extends React.Component {
    constructor(props){
        super(props);
        /*
            Props for this component:
                folder = Id number of the specialty that the person corresponds to.
                person = id of the person (based on its image id) that should be render on the image.
                title = the name of the person showing up.
                name = specialty name that the person corresponds to.
        */
    };
    // This function renders the Old image comparation frame based on some important information that the component needs.
    showPerson(){
        window.scrollTo(0,0); // Push back the scroll to the top.
        ReactDOM.render(<Old 
            folder={this.props.folder} 
            person={this.props.person} 
            title={this.props.title}
            name={this.props.specialty}/>,
            document.getElementById("app"));
    };
    render(){
        /* 
                Internal variable based on how much time the animation should take time organized by the position 
                of the image (the sequencial from 1 to n id), used later on animation delay style property.
        */
        let delayTime = this.props.person / 10; 
        // Renders the image with src set to the path based on the person id and gives the posibility to render the old picture when clicking.
        return (
            <img className='personImageGallery' 
            id={"p"+this.props.person+this.props.folder}
            src={"components/images/"+this.props.folder+"/"+this.props.person+".jpg"}
            style={{animationDelay: delayTime+"s"}}
            onClick={()=>this.showPerson()}
            >
            </img>
        );
    };
};
// Component for the name of the person in the gallery
class ImageTitle extends React.Component{
    constructor(props){
        super(props);
        /* 
            Props for this component:
                title = name of the person that is getting rendered.
        */
    };
    render(){
        /* 
                Internal variable based on how much time the animation should take time organized by the position 
                of the image (the sequencial from 1 to n id), used later on animation delay style property.
        */
        let delayTime = this.props.person / 10; 
        return (
            <p className='personNameGallery'
            style={{animationDelay: delayTime+"s"}}
            >{this.props.title}</p>
        );
    };
};
// Component  for the gallery based on the specialty name and ID.
class Gallery extends React.Component {
    constructor(props){
        super(props);
        /* 
            Props for this component:
            id = the specialty id to link with the image folders.
            specialty = the specialty title to be rendered.
        */
        this.state = {
            backgroundColors: ["#6D6D6D","#000000","#005DFF","#770000","#FFFFFF","#36DDFF","#CECECE"], // Background colors depending on specialty id
            colors: ["white","white","white","white","black","white","black"], // Font colors depending on specialty id.
            person: [] // Array for image names that correspond to images ID, filled based on the specialty id prop.
        };
    };
    componentDidMount(){
        let bodyItem = document.getElementsByTagName("body"); // Getting the body item.
        bodyItem[0].style.backgroundColor = this.state.backgroundColors[this.props.id]; // Changing the background color to one of the color vector depending on specialty id.
        /* 
            Switch that updates the person array state depending on specialty id, setting it to the corresponding names, based on
            an Excel used in the project planning, the vector index position matches in n-1 the picture in the images folder.
        */
        switch(this.props.id){
            case 0:
                let meca = [
                    "Angie López","Brittany Morales", "Daniela Angulo","Daniel Alfaro","Gibrán Gamboa","Ivan Bermúdez",
                    "Javier Chavarría","Javier Hidalgo","Joseph Martínez","Maria José Jiménez","Mariana Leiva","Nicole Ferguson",
                    "Sean Blandon","Valeria Solano","Yalixa Chavarría","Yirlany Fonseca","Astrid Castillo","Alejandro Ayales","Carlos Padilla",
                    "Isaac Orozco","Joseph Bonilla"
                ];
                this.setState({
                    person: meca
                });
            break;
            case 1:
                let dg = [
                    "Alexa Sancho","Amber Castro","Axel Saborío","Daniela Madríz","Diana Chávez","Eduardo Monge","Fiorella Passuelo",
                    "Gabriel Almanza","Jareth Mena","Jeremy García","Jimena Córdoba","Kryssia Ballesteros","Luciana Garro","Mariana Mora",
                    "Mariana Soto","Mariangel Tellez","Mónica Bermúdez","Samanta Chávez","Sebastián Garro","Stella Esquivel",
                    "Stephanie Blanco","Valeria Acevedo","Wendell Fallas","Werner Naranjo","Adrián Gómez","Litzy Gutiérrez","Carolina Blandino"
                    ,"Danita Solorzano"
                ];
                this.setState({
                    person: dg
                });
            break;
            case 2:
                let da = [
                    "Adrián Salazar","Alexa Guevara","Alyssa Castillo","Andrés Piedra","Ángeles Sanabria","Daniel Vargas",
                    "David Hernández","Fiorella Mayorga","Gabriel Reina","Heiner Aguero","Isis Hernández","Javier Moya","Jennifer García",
                    "Juan Diego Sánchez","Kendall González","Lucía Garro","Maria José Amador","Monserrath Rojas","Nicole Salas",
                    "Paulette Umaña","Rosa Toruño","Sebastián Chacón","Silvia Castro","Steven Retana","Steven Zúñiga","Andrés Romero",
                    "Gabriel Hidalgo","Chelsea Betancourt","Hanzel Hernández","Nicole Quesada"
                ];
                this.setState({
                    person: da
                });
            break;
            case 3:
                let ir = [
                    "Adrián Valerín","Allison Arguello","Andrey Sánchez","Brandon Sánchez","David Solano","Diana Martínez",
                    "Herberth Benedicts","Jhoel Morales","Julian Cascante","Maria José Sánchez","Manfred Ávalos","Maria Celeste Castro",
                    "Melanie Brenes","Melany Retana","Naomi Mora","Oscar Sandí","Sheryl Zamora"
                ];
                this.setState({
                    person: ir
                });
            break;
            case 4:
                let eca = [
                    "Alonso Zumbado","Andrew Valverde","Ariel Amador","Brittany Morales","Bryan Mora","Enrique Villalobos",
                    "Felip Zumbado","Gabriel Azofeifa","Gabriel Ballesteros","Isaac Bautista","Isaac Ponce","Johanna Morales",
                    "Johannes Sequeira","Jorge Madríz","Joseph Granados","Josue Herrera","Maria Celeste Granados","Natalia Chinchilla",
                    "Oscar Astua","Patrick Sevilla","Stwart Espinoza","Adrián Ulloa","Neikov Venegas","Steven Guerra"
                ];
                this.setState({
                    person: eca
                });
            break;
            case 5:
                let id = [
                    "Alejandro Chang","André López","Andrés Gonzáles","Brenda Castro","Carlos Cruz","Celeste Arias","Eduardo Solis",
                    "Fabián Mena","Fabián Vargas","Fabián Zamora","Freddy Segura","Gerson Centeno","Grettel Rico","Jason Valverde",
                    "Jimena Espinoza","Joan Rojas","Jose Daniel Araya","Jose Andrés Fuentes","Jose Pablo Sánchez","Jose Salas",
                    "Joshua Valverde","Jossué Valverde","Josué Carmona","Kevin Romero","Kimberly Morales","Melanie Arista",
                    "Oscar Vásquez","Reichel Morales","Sebastián Fernández","Sebastián Jiménez","Sofía Mora","Valeria Hernández",
                    "Daniel Campos","Manfred Pérez","Jose David Ardila","Joshua Rutherford"
                ];
                this.setState({
                    person: id
                });
            break;
            case 6:
                let ema = [
                    "Aida Ramírez","Aileen Arias","Alejandro Aviles","Alyssa Fallas","Caleb Arias","Cesar Fallas","Daniel Romero",
                    "Diego Morales","Gabriel Vindas","Jeremy Ramírez","Jeremy Siles","Jose Guillén","Juan Carlos García","Leandro Camacho",
                    "Luis Aguirre","Manfred Cardoza","Mariana López","Maricruz Meza","Nahuel Chinchilla","Ricardo Carias",
                    "Sharon Fenel","Thays Molina","Valeria Aguero","Valery González","Jimena Lalinde","Luis Angulo","Natalia Araya"
                ];
                this.setState({
                    person: ema
                });
            break;
        };
    };
    render(){
        // Renders the title of the specialty and loops over all the people in person array to show their image and name.
        return(
            <div>
                <Title title={this.props.specialty} color={this.state.colors[this.props.id]} />
                <div id='imagesGrid'>
                {  
                    this.state.person.map((object, index) =>
                        <div style={{color: this.state.colors[this.props.id]}}>
                            <ImageGallery 
                            folder={this.props.id} 
                            person={index+1} 
                            title={object}
                            specialty={this.props.specialty}
                            number={this.props.id}/>
                            <ImageTitle title={object} person={index+1}/>
                        </div>
                    )
                }
                </div>
            </div>
        );
    };
};
// Component for the specialties to showoff.
class Specialties extends React.Component{
    constructor(props){
        super(props);
        /*
            No properties used on the component.
        */
    };
    componentDidMount(){
        let bodyItem = document.getElementsByTagName("body"); // Gets the body item.
        bodyItem[0].style.backgroundColor = "#ffffff"; // Sets the color to the main color.
        bodyItem[0].style.backgroundImage = "url('style/backgrounds/general.png')"; // Canges the background to the original one.
    };
    // This function renders the gallery component based on what specialty was selected.
    showGallery(name, id){
        let bodyItem = document.getElementsByTagName("body"); // Gets the body item.
        bodyItem[0].style.backgroundImage = "url('style/backgrounds/"+id+".png')" // Sets the background image based on what specialty id was pushed.
        window.scrollTo(0,0); // Push back the scroll to the top.
        ReactDOM.render(<Gallery specialty={name} id={id} />,document.getElementById("app")); // Renders the gallery sending the id of the specialty and the name.
    };
    render(){
        /* Renders the grid to show down all the specialties and gives them a clickable option to execute the 
        showGallery method, rendering the gallery for that specialty. Also, it includes some other fuctionality like the 
        help form and the conditions of the usage of the web application. */
        return (
            <div>
                <h1 className='principal' id='pagetitle'>OL-D</h1>        
                <p className='principal'  id='madeby'>Hecho por el <span>SKEMClub</span></p>
                <div id='careers'>
                    <div className='careersBoxes' id='item1' onClick={() => this.showGallery("Mécanica de Precisión",0)}>
                        Mécanica de Precisión
                    </div>
                    <div className='careersBoxes' id='item2' onClick={() => this.showGallery("Diseño Gráfico",1)}>
                        Diseño Gráfico
                    </div>
                    <div className='careersBoxes' id='item3' onClick={() => this.showGallery("Dibujo Arquitectónico",2)}>
                        Dibujo Arquitectónico
                    </div>
                    <div className='careersBoxes' id='item4' onClick={() => this.showGallery("Informática en Redes",3)}>
                        Informática en Redes
                    </div>
                    <div className='careersBoxes' id='item5' onClick={() => this.showGallery("Electrónica",4)}>
                        Electrónica
                    </div>
                    <div className='careersBoxes' id='item6' onClick={() => this.showGallery("Informática en Desarrollo",5)}>
                        Informática en Desarrollo
                    </div>
                    <div className='careersBoxes' id='item7' onClick={() => this.showGallery("Electromecánica",6)}>
                        Electromecánica
                    </div>
                </div>
                <div id='supportContainer'><a className='support' href='https://bit.ly/Support-SKEMClubOLD' target='_blank'>Ayuda</a> 
                &nbsp;   &nbsp;   &nbsp;   &nbsp;  <a className='support' href='components/tyc.pdf' target='_blank'>Términos y Condiciones</a></div>
            </div>
        );
    };
};

/* Start animation components 💣 */
// Component for showing of the application disclaimer.
class Disclaimer extends React.Component{
    constructor(props){
        super(props);
         /*
                No properties used on the component.
        */
    };
    render(){
        // Shows a message that has a disclaimer about the making off and support of the application.
        return(
            <h1 className='disclaimer'>Este proyecto fue realizado en colaboración con los padres y las madres de familia.
            Si pusimos alguna información mal, no te gusta salir en el álbum digital o tuvieras cualquier otra queja, debajo de las 
            especialidades hay un formulario de ayuda.
            </h1>
        );
    };
};
// Component for showing of who made the page. (André was here ;D)
class MadeBy extends React.Component{
    constructor(props){
        super(props);
        /*
            No properties used on the component.
        */
    };
    render(){
        // Renders a container with the name of the people who made the project possible, love you all <3
        return (
            <div className='madeByContainer'>
                <h1 className='madeBy'>Realizado por el SKEMClub,<br/> con cariño para la gen 2020.
                <br/> <span> 
                    Créditos a <br/> Jimena Espinoza, Jimena Lalinde, Josue Carmona,
                     André López <br/>  Johannes Sequeira,  Fabián Mena, Jose Araya.
                </span>
                </h1>
            </div>
        );
    };
};

/* Start application functions 🎬 */
// Function to start the app
let startApp  = () => {
    /*
        It evaluates if the "start" cookie is already created, if not, then starts all the timeouts for rendering different 
        components to make the animation of the entrace, it only plays once because at the start it creates the cookie
        to tell the code that it is not the first time the person joined the page.
   */
    if(!localStorage.getItem('start')){
        localStorage.setItem("start",true) // Sets the "first time on page" cookie indicator to true.
        setTimeout(()=>{
            ReactDOM.render(<Disclaimer />, document.getElementById('app'));
        },1305);
        setTimeout(()=>{
            ReactDOM.render(<MadeBy/>, document.getElementById('app'));
        },9205);
        setTimeout(()=>{
            ReactDOM.render(<Specialties/>, document.getElementById('app'));
        },12505);
    }else{
        // If the cookie is created, it renders the specialties right away.
        setTimeout(()=>{
            ReactDOM.render(<Specialties/>, document.getElementById('app'));
        },1305);

    }
};
// Function to delete the cookie of start 
let deleteCookie = () => {
    localStorage.removeItem("start"); // Just in here for experimental purposes.
};

startApp(); // Starts the whole app to start rendering components.🤗

