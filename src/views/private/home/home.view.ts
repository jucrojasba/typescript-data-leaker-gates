import { loader } from '../../../components/loader/loader.component';
import { navbar } from '../../../components/navbar/navbar.component';
import { PostController } from '../../../controllers/post.controllers';
import { ResponseGetPosts } from '../../../models/post.model';
import {capitalizeFirstLetter} from '../../../helpers/string-helpers';
import './home.view.css'
import { getTodayDate } from '../../../helpers/getTodayDate';
export function homeView(){
    //Erase last page viewed & load navbar
    loader(true);
    const $root = document.getElementById("root") as HTMLElement;
    $root.innerHTML = "";
    navbar();
    loader(false);

    //HTMLElements
    const $homeContainer = document.createElement('div') as HTMLDivElement;
    const $homeTitle = document.createElement('h1') as HTMLHeadingElement;
    const $paragraphNoPost = document.createElement('p') as HTMLParagraphElement;
    const $postContainer = document.createElement('div') as HTMLDivElement;
    
    //Content
    $homeTitle.innerText='Post, we check it for you!'
    $paragraphNoPost.innerText='First, create a new post in upper bar.'


    //Classes and IDs
    $homeContainer.classList.add('home-container');
    $paragraphNoPost.setAttribute('id','paragraph-no-post');
    $postContainer.classList.add('post-container')


    //Jerarquia de Etiquetas HTML
    $root.appendChild($homeContainer);
    $homeContainer.appendChild($homeTitle);
    $homeContainer.appendChild($postContainer);

    //Eventos
    //Instanciate
    const posts:PostController = new PostController();

    document.addEventListener('DOMContentLoaded',async()=>{
    //Get posts
    loader(true);
    const userPosts:ResponseGetPosts[] = await posts.getPosts();
    console.log(userPosts);
    loader(false);
    
    //First Loaded Post
    if(userPosts.length === 0){
        $homeContainer.appendChild($paragraphNoPost);
    }else{
        $paragraphNoPost.remove();
    const postsCard:ResponseGetPosts[]|[] = userPosts;
    postsCard.forEach((post)=>{
    
        //Create HTML Elements
    const $postCard = document.createElement('div') as HTMLDivElement;
    const $title = document.createElement('h2') as HTMLHeadingElement;
    const $platform = document.createElement('h4') as HTMLHeadingElement;
    const $infoContainer = document.createElement('div') as HTMLDivElement;
    const $estimatedPublicationDate = document.createElement('p') as HTMLParagraphElement;
    const $createdAt = document.createElement('p') as HTMLParagraphElement;
    const $approvalPercentageContainer = document.createElement('div') as HTMLDivElement;
    const $approvalPercentage = document.createElement('h4') as HTMLHeadingElement;
    
    //Classes an IDs
    $postCard.classList.add('post-card');
    $infoContainer.classList.add('info-container');
    $approvalPercentageContainer.classList.add('approvalPercentage-container');
    $createdAt.classList.add('bottom-card-text');

    //Jerarquia de la post card
    $postContainer.appendChild($postCard);
    $postCard.appendChild($title);
    $postCard.appendChild($platform);
    $postCard.appendChild($infoContainer);
    $infoContainer.appendChild($approvalPercentageContainer);
    $infoContainer.appendChild($estimatedPublicationDate);
    $approvalPercentageContainer.appendChild($approvalPercentage);
    $postCard.appendChild($createdAt);
    // $postCard.appendChild(createDeleteButton(city.info.name));
    // $postCard.appendChild(createEditButton(city.info.name, city.info.country,city.info.reason));

    //Content
    $title.innerText= `${capitalizeFirstLetter(post.title)}`;
    $platform.innerText=`Platform ${capitalizeFirstLetter(post.platform)}`;
    $approvalPercentage.innerText=`${post.approvalPercentage} %`;
    $estimatedPublicationDate.innerText=`Publication Date ${getTodayDate(post.estimatedPublicationDate)}`;
    $createdAt.innerText=`Created at ${getTodayDate(post.creationDate)}`;
    
    //Logic for color in div progress
    $approvalPercentageContainer.style.backgroundColor=`${posts.colorProgress(post.approvalPercentage)}`;
    

    //End of all async events
    });
    }

    //End of all events
    })
    
    
}