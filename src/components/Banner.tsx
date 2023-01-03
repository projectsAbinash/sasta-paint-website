import { useEffect, useState } from 'react';
import  SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import joinLinks from '../linker';
import '../scss/components/banner.scss';
import token from '../tokens';
SwiperCore.use([Autoplay])

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

    const [bannerData, updateBannerData] = useState<any>(null)
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

    if(bannerData === null){
        return (
            <div className="bannerSkeleton">

            </div>
        )
    }

    return (
        <div id="banner">
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                autoplay={{
                    delay : 1500
                }}
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
