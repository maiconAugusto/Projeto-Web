/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-sequences */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IntlCurrencyInput from 'react-intl-currency-input';
import {
  faTrash, faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { currencyConfig } from '../../config/index';
import SideMenu from '../../components/sideMenu/index';
import { apiJsonPlaceholder, apiProvadev } from '../../service/index';
import { Container } from './style';

function List() {
  const [loadingGetUser, setLoadingGetUser] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usersSelected, setUserSelected] = useState(null);
  const [debitUserSelected, setDebitUserSelected] = useState([]);
  const [showModalEditDebit, setshowModalEditDebit] = useState(false);
  const [debitSelected, setDebetiSelected] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  async function getUserPlaceholder() {
    const response = await apiJsonPlaceholder.get('users');
    return response.data;
  }
  async function getAllDebits() {
    const response = await apiProvadev.get('/divida');
    return response.data.result;
  }

  async function resolveData() {
    setLoadingGetUser(true);
    const userDebits = [];
    const response = await Promise.all([getAllDebits(), getUserPlaceholder()]);
    const uniqueObject = {};

    const uniqueDebitsAPI = response[0]
      .filter((item) => !uniqueObject[item.idUsuario] && (uniqueObject[item.idUsuario] = true));
    uniqueDebitsAPI.forEach((item) => {
      response[1].forEach((user) => {
        if (item.idUsuario === user.id) {
          userDebits.push(user);
        }
      });
    });
    setUsers(userDebits);
    setLoadingGetUser(false);
  }

  async function getDebitById(id) {
    setLoading(true);
    const response = await apiProvadev.get('/divida');
    const { result } = response.data;
    const getDebitUserById = result.filter((item) => item.idUsuario === id);
    setDebitUserSelected(getDebitUserById);
    setLoading(false);
  }

  async function deleteDebitById(id) {
    await apiProvadev.delete(`/divida/${id}`).then(() => {
      toast.success('Dívida removida com sucesso!');
      const removeOfList = debitUserSelected.filter((item) => item._id !== id);
      setDebitUserSelected(removeOfList);
      resolveData();
      if (removeOfList.length === 0) {
        setShowModal(false);
      }
    }).catch(() => {
      toast.error('Ops, não foi possível deletar a dívida');
    });
  }

  function handleModalViewDebit() {
    return (
      <Modal show={showModal} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{usersSelected === null ? '' : usersSelected.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ minWidth: 300 }}>
            {loading ? (
              <Spinner animation="border" variant="success" />
            ) : null}
            {debitUserSelected.map((item) => (
              <div
                key={item._id}
                style={{
                  display: 'flex', flexDirection: 'row', margin: 10, width: '100%',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                  <span>
                    Motivo:
                    {' '}
                    {item.motivo}
                  </span>
                  <span>
                    Valor:
                    {' '}
                    {item.valor}
                    {' '}
                    RS
                  </span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-around', width: '20%', alignItems: 'center',
                }}
                >
                  <FontAwesomeIcon style={{ cursor: 'pointer' }} color="red" icon={faTrash} onClick={() => deleteDebitById(item._id)} />
                  <FontAwesomeIcon
                    style={{ cursor: 'pointer' }}
                    color="orange"
                    icon={faEdit}
                    onClick={() => {
                      setDebetiSelected(item);
                      setshowModalEditDebit(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleClose()}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function handleChange(event, value, maskedValue) {
    event.preventDefault();
    setAmount(value);
  }

  function handleModalEditdebit() {
    return (
      <Modal show={showModalEditDebit} onHide={() => setshowModalEditDebit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar dívida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ fontWeight: '600', fontSize: 16 }}>{usersSelected === null ? '' : usersSelected.name}</span>
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', width: '100%', height: 200,
          }}
          >
            <label>Motivo</label>
            <input disabled={loadingEdit} value={reason} style={{ height: 40, borderRadius: 4, marginBottom: 10 }} placeholder={debitSelected === null ? '' : debitSelected.motivo} onChange={(value) => setReason(value.target.value)} />
            <label>Valor</label>
            <IntlCurrencyInput
              disabled={loadingEdit}
              style={{ height: 40, borderRadius: 4, marginBottom: 10 }}
              placeholder={debitSelected === null ? '' : debitSelected.valor}
              value={amount}
              currency="BRL"
              config={currencyConfig}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loadingEdit
            ? (
              <div>
                <Spinner style={{ marginRight: 20, marginTop: 4 }} animation="border" variant="success" />
              </div>
            )
            : (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  disabled={loadingEdit}
                  variant="danger"
                  onClick={() => {
                    setReason('');
                    setAmount('');
                    setDebetiSelected('');
                    setshowModalEditDebit(false);
                  }}
                >
                  Cancelar

                </Button>
                <Button style={{ marginLeft: 10 }} disabled={loadingEdit} variant="success" onClick={() => saveEditdebit()}>Salvar</Button>
              </div>
            )}
        </Modal.Footer>
      </Modal>
    );
  }

  async function saveEditdebit() {
    if (reason === '' && amount === '') {
      return toast.warning('Ops, você se esqueceu de informar os novos valores!');
    }

    setLoadingEdit(true);
    const data = {
      idUsuario: usersSelected.id,
      motivo: reason === '' ? debitSelected.motivo : reason,
      valor: amount === '' ? debitSelected.valor : amount,
    };
    await apiProvadev.put(`/divida/${debitSelected._id}`, data).then(() => {
      setLoadingEdit(false);
      toast.success('Dívida editada com sucesso!');
      setReason('');
      setAmount('');
      setDebetiSelected('');
      setshowModalEditDebit(false);
      const debitUserSelectedEdited = debitUserSelected.map((item) => {
        if (item._id === debitSelected._id) {
          item.motivo = data.motivo;
          item.valor = data.valor;
          return item;
        }
        return item;
      });
      setDebitUserSelected(debitUserSelectedEdited);
    }).catch(() => {
      setLoadingEdit(false);
      toast.error('Ops, algo deu errado, tente novamnete');
    });
  }

  function handleClose() {
    setShowModal(false);
    setDebitUserSelected([]);
  }

  useEffect(() => {
    resolveData();
  }, []);
  return (
    <>
      <SideMenu />
      <Container>
        <strong>Registro de inadimplentes</strong>
        {loadingGetUser ? (
          <div style={{
            display: 'flex', justifyContent: 'center', width: '70%',
          }}
          >
            <Spinner style={{ marginLeft: 40, marginTop: 50 }} animation="border" variant="success" />
          </div>
        ) : null}
        <ul>
          {users.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                getDebitById(item.id);
                setUserSelected(item);
                setShowModal(true);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
        {handleModalViewDebit()}
        {handleModalEditdebit()}
      </Container>
    </>
  );
}

export default List;
