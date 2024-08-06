import { loader } from '../../../components/loader/loader.component';
import { navbar } from '../../../components/navbar/navbar.component';
import { PostController } from '../../../controllers/post.controllers';
import { ResponseGetPosts } from '../../../models/post.model';
import {capitalizeFirstLetter} from '../../../helpers/string-helpers';
import './home.view.css'
import { getTodayDate } from '../../../helpers/getTodayDate';
import { createEditButton } from '../../../components/editButton/edit-button.component';
import { showModal } from "../../../components/modals/modal.component.ts";
import { editPost } from '../../../components/update-post/update-city.component';
import { createDeleteButton } from '../../../components/deleteButton/delete-button.component.ts';
import { showConfirmation } from "../../../components/confirmations/confirmation.component.ts";
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
    $homeTitle.innerText='Your Post, we check it for you!'
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
    $postCard.appendChild(createDeleteButton(String(post.id)));
    $postCard.appendChild(createEditButton(String(post.id),post.title,post.body,post.postUrl,String(post.postByUser),post.platform));

    //Content
    $title.innerText= `${capitalizeFirstLetter(post.title)}`;
    $platform.innerText=`Platform ${capitalizeFirstLetter(post.platform)}`;
    $approvalPercentage.innerText=`${post.approvalPercentage} %`;
    $estimatedPublicationDate.innerText=`Publication Date ${getTodayDate(post.estimatedPublicationDate)}`;
    $createdAt.innerText=`Created at ${getTodayDate(post.creationDate)}`;
    
    //Logic for color in div progress
    $approvalPercentageContainer.style.backgroundColor=`${posts.colorProgress(post.approvalPercentage)}`;
    
    //Update City
    document.querySelectorAll('#edit-button').forEach(edit=>{
        edit.addEventListener('click',async()=>{
          //Tomar parametros para mostrat modal de editar
          const idPost = edit.getAttribute('idPost');
          const title = edit.getAttribute('title');
          const body = edit.getAttribute('body');
          const postUrl = edit.getAttribute('postUrl');
          const platform = edit.getAttribute('platform');

          if(idPost && title && body && postUrl && platform){
            editPost(idPost,title,body,postUrl,platform);
            }
          else{
            showModal('Post was not founded');
          }
        });
      });

      //Delete Post
    document.querySelectorAll('#delete-button').forEach(button=>{
      button.addEventListener('click',async()=>{
        const postId = button.getAttribute('deleteid');
        if(postId){
          const userResponse = true;

          if(userResponse){
            try {
              loader(true);
              await posts.deletePost(postId);
              loader(false);
              showModal(`This post was deleted succesfully`);
              window.location.reload();
            } catch (error) {
              showModal(`${error}`)
            }
          }
        }else{
          showModal('Post was not founded')
        }
      })
    })
    //End of all async events
    });
    }

    //End of all events
    })
    
    
}