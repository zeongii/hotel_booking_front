import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";

let RoomImgInsert = () => {
    let params = useParams();
    let id = parseInt(params.id)
    console.log(id)
    let [file, setFile] = useState(null); // File state
    let [filePreviews, setFilePreviews] = useState([]); // To store file previews

    let navigate = useNavigate()

    let moveToNext  = (id) => {
        navigate('/room/roomOne/' + id)
    }


    const handleChangeFile = (event) => {
        const files = event.target.files;
        setFile(files);

        // Create URLs for file previews
        const previews = Array.from(files).map(file => URL.createObjectURL(file));
        setFilePreviews(previews);
    };

    function Send(id, files) {
        console.log('Sending files with id:', id);
        console.log('Files:', files);

        const formData = new FormData();
        Array.from(files).forEach((fileItem) => formData.append("file", fileItem));

        formData.append("id", id);
        console.log('id:', id);
        console.log('fd:', formData);
        axios.post('http://localhost:8080/room/imgInsert/' + id, formData, {
            baseURL: 'http://localhost:8080'
        })
            .then((response) => {
                console.log('Response:', response.data);
                moveToNext(id)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
    <Container className={"mt-3"}>
        <div className="text-center">
            <h2>업로드 하실 객실의 사진을 선택해주세요</h2>
            <Form.Label>Please select a photo of the room to upload</Form.Label>
            <div className="centered-form-control">
                <Form.Control
                    type="file"
                    id="file"
                    onChange={handleChangeFile}
                    style={{width: '600px'}}
                    className="custom-file-input"
                    multiple

                />
            </div>
            <div>
                {filePreviews.length > 0 && (
                    <div>
                        {filePreviews.map((preview, index) => (
                            <div key={index} className="file-preview">
                                <img
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    style={{width: '600px', height: '500px', objectFit: 'cover', margin: '5px'}}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-center mt-3">
                <Button
                    onClick={() => id && file && Send(id, file)}
                    disabled={!id || !file}
                >
                    사진 입력하기
                </Button>
            </div>
        </div>
    </Container>
    );

}

export default RoomImgInsert