// 화면 선택값과 백엔드 검색 조건을 같은 형태로 전달하기 위한 위치 카탈로그입니다.
// latitude/longitude는 지도·항공·숙소 검색 API가 바로 사용할 수 있는 WGS84 좌표입니다.

export const departureRegions = [
  {
    id: 'seoul',
    region: '서울특별시',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gyeongbokgung%2C_Seoul%2C_South_Korea_%2850601361222%29.jpg?width=1600',
    districts: [
      { id: 'seoul-jongno', detail: '종로구', latitude: 37.5730, longitude: 126.9794, airportCode: 'GMP', image: 'https://images.unsplash.com/photo-1538485399081-7c8979922c67?auto=format&fit=crop&w=1200&q=90' },
      { id: 'seoul-mapogu', detail: '마포구', latitude: 37.5663, longitude: 126.9019, airportCode: 'GMP', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=90' },
      { id: 'seoul-gangnam', detail: '강남구', latitude: 37.4979, longitude: 127.0276, airportCode: 'GMP', image: 'https://images.unsplash.com/photo-1598804190149-3b82a626d806?auto=format&fit=crop&w=1200&q=90' },
    ],
  },
  {
    id: 'gyeonggi',
    region: '경기도',
    image: 'https://prod-rte-static.rakutentravelxchange.com/e62cb93e-075c-40cf-99a6-0ab9dc3686cf.jpg?format=webp&height=1000',
    districts: [
      { id: 'gyeonggi-paju', detail: '파주시', latitude: 37.7599, longitude: 126.7800, airportCode: 'ICN', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gamaksan%20Suspension%20Bridge%20-%2054972915976.jpg?width=1600' },
      { id: 'gyeonggi-suwon', detail: '수원시', latitude: 37.2636, longitude: 127.0286, airportCode: 'GMP', image: 'https://www.suwon.go.kr/common-upload/upload/visitsuwon/2018/5/30/183ce0d6-2528-4f43-be79-b2d134f5e932.png' },
      { id: 'gyeonggi-gapyeong', detail: '가평군', latitude: 37.8315, longitude: 127.5100, airportCode: 'GMP', image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/463000/463964-Nami-Island.jpg?h=800&impolicy=fcrop&q=medium&w=1200' },
      { id: 'gyeonggi-pocheon', detail: '포천시', latitude: 37.9420, longitude: 127.2370, airportCode: 'ICN', image: 'https://static.wixstatic.com/media/3d740d_c923f46f9d66434e8583b4e4594b7315~mv2.webp/v1/fill/w_796,h_429,al_c,q_80,enc_avif,quality_auto/pocheon%20air%20valley200.webp' },
      { id: 'gyeonggi-yangpyeong', detail: '양평군', latitude: 37.5439, longitude: 127.3204, airportCode: 'GMP', image: 'https://images.trvl-media.com/place/6224598/0f005bde-8aef-4391-86d6-f2dbd9cf9161.jpg' },
      { id: 'gyeonggi-namyangju', detail: '남양주시', latitude: 37.5130, longitude: 127.3080, airportCode: 'GMP', image: 'https://tong.visitkorea.or.kr/cms/resource/26/3532326_image2_1.jpg' },
    ],
  },
  {
    id: 'incheon',
    region: '인천광역시',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Songdo%27s_central_park_and_the_NEATT%2C_Incheon%2C_South_Korea.jpg?width=1600',
    districts: [
      { id: 'incheon-jung', detail: '중구', latitude: 37.4738, longitude: 126.6218, airportCode: 'ICN', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Songdo%27s_central_park_and_the_NEATT%2C_Incheon%2C_South_Korea.jpg?width=1600' },
      { id: 'incheon-songdo', detail: '연수구·송도', latitude: 37.3897, longitude: 126.6430, airportCode: 'ICN', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Songdo%27s_central_park_and_the_NEATT%2C_Incheon%2C_South_Korea.jpg?width=1600' },
    ],
  },
  {
    id: 'busan',
    region: '부산광역시',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Colorful_houses_in_Gamcheon_Culture_Village_at_sunset_in_Busan_South_Korea.jpg?width=1600',
    districts: [
      { id: 'busan-haeundae', detail: '해운대구', latitude: 35.1631, longitude: 129.1635, airportCode: 'PUS', image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=1200&q=90' },
      { id: 'busan-suyeong', detail: '수영구·광안리', latitude: 35.1532, longitude: 129.1187, airportCode: 'PUS', image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=90' },
    ],
  },
  {
    id: 'gangwon',
    region: '강원특별자치도',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Korea_Seoraksan.jpg?width=1600',
    districts: [
      { id: 'gangwon-chuncheon', detail: '춘천시', latitude: 37.8813, longitude: 127.7300, airportCode: 'GMP', image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/463000/463964-Nami-Island.jpg?h=800&impolicy=fcrop&q=medium&w=1200' },
      { id: 'gangwon-gangneung', detail: '강릉시', latitude: 37.7519, longitude: 128.8761, airportCode: 'YNY', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90' },
      { id: 'gangwon-sokcho', detail: '속초시', latitude: 38.2070, longitude: 128.5918, airportCode: 'YNY', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90' },
    ],
  },
  {
    id: 'daejeon',
    region: '대전광역시',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Daejeon_Expo_Bridge_2020_1.jpg?width=1600',
    districts: [
      { id: 'daejeon-yuseong', detail: '유성구', latitude: 36.3622, longitude: 127.3561, airportCode: 'CJJ', image: 'https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&q=90' },
      { id: 'daejeon-seo', detail: '서구', latitude: 36.3550, longitude: 127.3839, airportCode: 'CJJ', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=90' },
    ],
  },
]

export const destinationCoordinatesByName = {
  서울: { id: 'destination-seoul', region: '서울특별시', detail: '종로·광화문', latitude: 37.5730, longitude: 126.9794, image: 'https://anniehoa.com/Korea/Gyeongbokgung/Hall/3.jpg' },
  부산: { id: 'destination-busan', region: '부산광역시', detail: '해운대', latitude: 35.1631, longitude: 129.1635, image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=1200&q=90' },
  제주도: { id: 'destination-jeju', region: '제주특별자치도', detail: '제주시', latitude: 33.4996, longitude: 126.5312, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Yongduam_in_jeju.jpg?width=1600' },
  전주: { id: 'destination-jeonju', region: '전북특별자치도', detail: '완산구', latitude: 35.8242, longitude: 127.1480, image: 'https://tour.jeonju.go.kr/images/visitjj/contents/streetmap/img_hanok00.jpg' },
  경주: { id: 'destination-gyeongju', region: '경상북도', detail: '황리단길', latitude: 35.8562, longitude: 129.2247, image: 'https://cdn.welfarehello.com/naver-blog/production/gyeongju_e/2025-05/223857733508/gyeongju_e_223857733508_2.jpg?f=webp&q=80&w=1200' },
  여수: { id: 'destination-yeosu', region: '전라남도', detail: '오동도', latitude: 34.7604, longitude: 127.6622, image: 'https://img.einet.kr/P202101006/travel/42924/01.jpg?v=1684740236' },
  '가평·춘천': { id: 'destination-gapyeong-chuncheon', region: '경기도·강원특별자치도', detail: '남이섬·의암호', latitude: 37.8813, longitude: 127.7300, image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/463000/463964-Nami-Island.jpg?h=800&impolicy=fcrop&q=medium&w=1200' },
  속초: { id: 'destination-sokcho', region: '강원특별자치도', detail: '설악산·속초해변', latitude: 38.2070, longitude: 128.5918, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90' },
  후쿠오카: { id: 'destination-fukuoka', region: '후쿠오카현', detail: '하카타', latitude: 33.5904, longitude: 130.4017, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=90' },
  방콕: { id: 'destination-bangkok', region: '방콕', detail: '왓 아룬', latitude: 13.7563, longitude: 100.5018, image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=90' },
  뉴욕: { id: 'destination-newyork', region: '뉴욕주', detail: '맨해튼', latitude: 40.7128, longitude: -74.006, image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=90' },
  오사카: { id: 'destination-osaka', region: '오사카부', detail: '난바', latitude: 34.6937, longitude: 135.5023, image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=90' },
  다낭: { id: 'destination-danang', region: '다낭', detail: '미케비치', latitude: 16.0544, longitude: 108.2022, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=90' },
  타이베이: { id: 'destination-taipei', region: '타이베이시', detail: '시먼딩', latitude: 25.0330, longitude: 121.5654, image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1200&q=90' },
  파리: { id: 'destination-paris', region: '일드프랑스', detail: '에펠탑', latitude: 48.8566, longitude: 2.3522, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=90' },
  시드니: { id: 'destination-sydney', region: '뉴사우스웨일스', detail: '하버', latitude: -33.8688, longitude: 151.2093, image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=90' },
}

export const jejuRegionCoordinates = {
  '제주공항·시내': { id: 'jeju-airport-city', region: '제주특별자치도', detail: '제주공항·시내', latitude: 33.5104, longitude: 126.4921 },
  애월: { id: 'jeju-aewol', region: '제주특별자치도', detail: '애월', latitude: 33.4639, longitude: 126.3118 },
  '협재·한림': { id: 'jeju-hyeopjae-hallim', region: '제주특별자치도', detail: '협재·한림', latitude: 33.3948, longitude: 126.2395 },
  '중문·서귀포': { id: 'jeju-jungmun-seogwipo', region: '제주특별자치도', detail: '중문·서귀포', latitude: 33.2520, longitude: 126.4124 },
  '성산·섭지코지': { id: 'jeju-seongsan-seopjikoji', region: '제주특별자치도', detail: '성산·섭지코지', latitude: 33.4584, longitude: 126.9425 },
  '함덕·조천': { id: 'jeju-hamdeok-jochen', region: '제주특별자치도', detail: '함덕·조천', latitude: 33.5425, longitude: 126.6683 },
}

export const toApiLocation = (location) =>
  location
    ? {
        locationId: location.id,
        administrativeArea: location.region,
        localArea: location.detail,
        latitude: location.latitude ?? null,
        longitude: location.longitude ?? null,
        airportCode: location.airportCode ?? null,
        needsGeocoding: Boolean(location.needsGeocoding),
      }
    : null
