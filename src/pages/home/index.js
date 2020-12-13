/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import IntlCurrencyInput from 'react-intl-currency-input';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import SideMenu from '../../components/sideMenu/index';
import { apiJsonPlaceholder, apiProvadev } from '../../service/index';
import { Container, Form } from './style';
import { currencyConfig } from '../../config/index';
import Button from '../../components/button/index';

function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [selectName, setSelectedName] = useState('Selecione um cliente');

  async function getUserPlaceholder() {
    const response = await apiJsonPlaceholder.get('users');
    setUsers(response.data);
  }

  async function sendToAPi(event) {
    setLoading(true);
    event.preventDefault();
    const data = {
      idUsuario: parseInt(userId),
      valor: amount,
      motivo: reason,
    };
    apiProvadev.post('/divida', data).then(() => {
      toast.success('👏 Dívida registrada com sucesso');
      setUserId('');
      setAmount('');
      setReason('');
      setLoading(false);
    }).catch(() => {
      toast.error('A dívida não pode ser registrada, falta algum parâmetro');
      setLoading(false);
    });
  }

  function handleChangeId(event) {
    setUserId(event.target.value);
  }

  function handleChange(event, value, maskedValue) {
    event.preventDefault();
    const modifyCifra = maskedValue.replace('R$', '');
    const modifyValue = modifyCifra.replace(',', '.');
    setAmount(modifyValue);
  }

  useEffect(() => {
    getUserPlaceholder();
  }, []);
  return (
    <>
      <SideMenu />
      <Container>
        <strong>Cadastro de Inadimplentes</strong>
        <Form>
          <form onSubmit={sendToAPi}>
            <label>Cliente</label>
            <select value={selectName} onChange={handleChangeId} disabled={loading}>
              <option value="Selecione um cliente">Selecione um cliente</option>
              {users.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            <label>Dívida</label>
            <input maxLength={26} disabled={loading} value={reason} placeholder="Motivo da dívida" onChange={(value) => setReason(value.target.value)} />
            <label>Valor</label>
            <IntlCurrencyInput
              disabled={loading}
              value={amount}
              currency="BRL"
              config={currencyConfig}
              onChange={handleChange}
            />
            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
            >
              <div style={{ display: 'flex', marginRight: 40 }}>
                {loading ? (
                  <Spinner style={{ marginTop: 8, marginRight: 20 }} animation="border" variant="success" />
                ) : (
                  <>
                    <Button data="Salvar" color="#229961" />
                  </>
                )}
              </div>
            </div>
          </form>
        </Form>
      </Container>
    </>
  );
}

export default Home;
