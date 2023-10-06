import {useEffect, useState } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { fetchImages } from "./services/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App (){

  const [images, setImages] = useState([])
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPage] = useState(0)
  const [buttonHidden, setButtonHidden] = useState(false)


  useEffect(()=>{
    const getImages= async()=>{
      try {
      setIsLoading(true)
      const response = await fetchImages(category, page)
      const images = response.hits;
      const totalPages = response.total
      setImages((prevState)=>[...prevState, ...images])
      setTotalPage(Math.ceil(totalPages / 12))
      } catch (error) {
        Notify.failure(error.message);
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    }
    if (category) {
      getImages();
    }
  }, [category, page])



  const handleSubmit=(e)=>{
    e.preventDefault()
    const imageTofind = e.currentTarget.elements.search.value
    if (imageTofind.trim()===""){
      return Notify.warning('It is not possible to make a request for an empty srtring')
    }
    setCategory(imageTofind)
    setImages([])
    setPage(1)

  }

  const handleLoadMore=()=>{
    if(page < totalPages){
      setPage((prevstate) => prevstate + 1)
    }else {
      setButtonHidden(true)
    }
  }


  return (
    <div className="App">
      <SearchBar onSubmit={handleSubmit}/>
      {isLoading && <Loader/>}
      {images.length > 0 ? <><ImageGallery images={images}/></> : <p className="InformLoadMore">Search for images!</p>}
      {images.length > 0 && !buttonHidden && <Button onClick={handleLoadMore}/>}
      {buttonHidden && <p className="InformLoadMore">Sorry, there all images we have!</p>}
      
    </div>
  );
};
