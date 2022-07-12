import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const DeleteClient = (props) => {
    const { id } = useParams();
    const [client, setClient] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await api.get(`/clients/${id}`);
            setClient(response.data);
        })()
    }, [id]);

    // console.log(client);

    const handleRemoveClient = async () => {
        api.delete(`/clients/${id}`)
        navigate("/");
    }

    return (
        <>
            {
                client.map(user => (
                    < div >
                        <h2>Deseja excluir o cliente <strong>{user?.nome}</strong>?</h2>
                        <br />
                        <div className="btn-group">
                            <Link to="/" className="btn btn-primary">
                                <i className="fa fa-arrow-left"></i> Cancelar
                            </Link>
                            <button onClick={handleRemoveClient} className="btn btn-danger">
                                Excluir <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div >
                ))}
        </>
    );
}

export default DeleteClient;