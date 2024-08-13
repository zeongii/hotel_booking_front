import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {Button, Container} from "react-bootstrap";

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
            <div>
                <h5>File Data</h5>
                <input type="file" id="file" onChange={handleChangeFile} multiple />
                <div>
                    <h5>Selected Files:</h5>
                    {filePreviews.length > 0 && (
                        <div>
                            {filePreviews.map((preview, index) => (
                                <div key={index} className="file-preview">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                    />
                                    <p>{file[index]?.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-center mt-3">
                    <Button
                        onClick={() => id && file && Send(id, file)}

                    >
                        Send
                    </Button>
                </div>
            </div>
        </Container>
    );

}

export default RoomImgInsert