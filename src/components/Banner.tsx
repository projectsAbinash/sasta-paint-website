import { useEffect, useState } from 'react'
import '../scss/components/banner.scss'
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react"
import joinLinks from '../linker';
import token from '../tokens';
import { Link } from 'react-router-dom';
import images from '../assets/image';


function makeRequestData(): object {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token.get('registrationToken')
        }
    }
}
const bannerAPILink = joinLinks('home/banners')
const reqData = makeRequestData()



function Banner() {

    const [bannerData, updateBannerData] = useState<any>([])
    let allBanners: any[] = []

    useEffect(() => {
        fetch(bannerAPILink, reqData).then(data => data.json())
            .then(data => {
                console.log(data)
                data = data.banners
                data.forEach((banner: any) => {
                    const singleBanner = {
                        src: banner.src,
                        href: banner.href,
                        name: banner.Name,
                        id: banner.id
                    }
                    allBanners.push(singleBanner)
                })
                updateBannerData(allBanners)
            })
    }, [])

    let id = 1

    return (
        <div id="banner">
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {bannerData.map((banner: any) => {
                    id++
                    return (
                        <SwiperSlide id={banner.id}>
                            <a href={banner.href}>
                                <img src={banner.src} />
                            </a>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </div>
    )
}

export default Banner