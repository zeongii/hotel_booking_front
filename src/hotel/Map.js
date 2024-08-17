import React, { useEffect, useRef, useState } from "react";

const { kakao } = window;

export const Map = ({ address }) => {
    const container = useRef(null); // 지도 컨테이너 접근
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null); // 마커 상태 추가

    useEffect(() => {
        // 지도 옵션 설정
        const options = {
            center: new kakao.maps.LatLng(37.5665, 126.978), // 기본 좌표 (서울시청)
            level: 3, // 지도 확대 레벨
        };

        const mapInstance = new kakao.maps.Map(container.current, options);
        setMap(mapInstance);
    }, []);

    useEffect(() => {
        if (map && address) {
            // 주소를 좌표로 변환하는 Geocoder 객체 생성
            const geocoder = new kakao.maps.services.Geocoder();

            // 주소를 좌표로 변환
            geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const { x, y } = result[0].address;
                    const position = new kakao.maps.LatLng(y, x);
                    console.log(address)

                    // 기존 마커가 있을 경우 제거
                    if (marker) {
                        marker.setMap(null);
                    }

                    // 마커 생성
                    const newMarker = new kakao.maps.Marker({
                        position: position,
                        map: map,
                        title: address,
                    });

                    // 마커 상태 업데이트
                    setMarker(newMarker);

                    // 지도 중심을 마커 위치로 이동
                    map.setCenter(position);
                } else {
                    console.error('주소 변환 실패:', status);
                    // 주소 변환 실패 시, 기본 좌표로 이동
                    map.setCenter(new kakao.maps.LatLng(37.5665, 126.978)); // 서울 시청 기본 좌표
                }
            } );
        }
    }, [address, map]); // map과 address가 변경될 때마다 실행

    return (
        <div style={{ width: "300px", height: "300px" }} ref={container}></div>
    );
};

export default Map;