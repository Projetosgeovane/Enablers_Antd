import { Form, Input, InputNumber, Popconfirm, Table, Typography, Divider } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ClientList2 = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('http://localhost:4000/clients');
                setData(response.data);
                console.log(response.data);
            }
        )()
    }, []);



    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            width: '25%',
            editable: true,
        },
        {
            title: 'Endereço',
            dataIndex: 'endereco',
            width: '15%',
            editable: true,
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            width: '40%',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '40%',
            editable: true,
        },
        {
            title: 'Actions',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <>
                        <div className="btn-group">
                            <Link to={`/edit/${record.id}/client`} className="btn btn-primary">
                                <i className="fa fa-edit"></i>
                            </Link>
                            <Link to={`/delete/${record.id}/client`} className="btn btn-danger">
                                <i className="fa fa-trash"></i>
                            </Link>
                        </div>
                    </>
                )
            }
        }

    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <div>
                <Link className="nav-link" id='button-nav-client' activeStyle={{ fontWeight: 'bold' }} to="/createclient">Cadastrar Cliente</Link>
            </div>
            <Table
                rowKey={record => record.id}

                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default ClientList2;