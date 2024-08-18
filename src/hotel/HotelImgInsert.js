import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {Button, CloseButton, Container, Form} from "react-bootstrap";

let HotelImgInsert = () => {
    let params = useParams();
    let id = parseInt(params.id);

    let [files, setFiles] = useState([]); // 파일과 미리 보기를 저장할 상태
    let [filePreviews, setFilePreviews] = useState([]);

    let navigate = useNavigate();

    const moveToNext = () => {
        navigate('/hotelOne/' + id, { state: { refresh: true } });
    };


    const handleChangeFile = (event) => {
        const selectedFiles = Array.from(event.target.files);


        const previews = selectedFiles.map(file => URL.createObjectURL(file));

        setFiles(selectedFiles);
        setFilePreviews(previews);
    };


    const handleDeleteFile = (index) => {

        const updatedFiles = files.filter((_, i) => i !== index);
        const updatedPreviews = filePreviews.filter((_, i) => i !== index);

        setFiles(updatedFiles);
        setFilePreviews(updatedPreviews);


        URL.revokeObjectURL(filePreviews[index]);
    };


    function Send(id, files) {
        console.log('Sending files with id:', id);
        console.log('Files:', files);

        const formData = new FormData();
        files.forEach((file) => formData.append("file", file));

        formData.append("id", id);
        console.log('id:', id);
        console.log('fd:', formData);

        axios.post('http://localhost:8080/hotel/imgInsert/' + id, formData, {
            baseURL: 'http://localhost:8080'
        })
            .then((response) => {
                console.log('Response:', response.data);
                const insertImg = response.data
                navigate('/hotelOne/' + id, { state: { refresh: true } });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Container className={"mt-3"}>
            <div className="text-center">
                <h2>업로드 하실 호텔의 사진을 선택해주세요</h2>
                <Form.Label>호텔의 사진을 선택해주세요</Form.Label>
                <div className="centered-form-control">
                    <Form.Control
                        type="file"
                        id="file"
                        onChange={handleChangeFile}
                        style={{ width: '600px' }}
                        className="custom-file-input"
                        multiple
                    />
                </div>
                <div>


                    {filePreviews.length > 0 && (
                        <div>
                            {filePreviews.map((preview, index) => (
                                <div key={index} className="file-preview" style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                                    <img
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        style={{ width: '600px', height: '500px', objectFit: 'cover' }}
                                    />
                                    <CloseButton
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDeleteFile(index)}
                                        style={{ position: 'absolute', top: '5px', right: '5px' }}
                                    >
                                    </CloseButton>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-center mt-3">
                    <Button
                        onClick={() => id && files.length > 0 && Send(id, files)}
                        disabled={!id || files.length === 0}
                    >
                        사진 입력하기
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default HotelImgInsert;