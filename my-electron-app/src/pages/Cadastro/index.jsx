import { useEffect, useState, useRef } from 'react'
import styles from './style.module.css';
import lixeira from '../../assets/icones/imgLixeira.png.webp'
import api from '../../services/api'
import { Link, useNavigate } from "react-router-dom";
import * as Images from '../../assets'; // Importa todas as imagens de forma organizada


function voltarParaHome() {
    navigate("/"); // Volta para a página principal
}

function Register() {

  const [forca, setForca] = useState({ largura: '0%', cor: '', texto: 'Digite uma senha' });

  const avaliarSenha = () => {
    const senha = inputSenha.current.value;

    if (senha.length === 0) {
      setForca({ largura: '0%', cor: '', texto: 'Digite uma senha' });
      return;
    }

    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temSimbolo = /[\W_]/.test(senha);

    let pontos = 0;
    if (temMaiuscula) pontos++;
    if (temMinuscula) pontos++;
    if (temNumero) pontos++;
    if (temSimbolo) pontos++;
    if (senha.length >= 8) pontos++;

    if (pontos <= 2) {
      setForca({ largura: '33%', cor: styles.fraca, texto: 'Senha fraca' });
    } else if (pontos <= 4) {
      setForca({ largura: '66%', cor: styles.media, texto: 'Senha média' });
    } else {
      setForca({ largura: '100%', cor: styles.boa, texto: 'Senha boa' });
    }
  };
  
const navigate = useNavigate()


function irParaLogin() {
  navigate('/login');
}

const [users, setUsers] = useState([])

const inputNome = useRef()
const inputEmail = useRef()
const inputSenha = useRef()
const inputConfirmSenha = useRef();


async function getUsers(){
  const usersFromApi = await api.get('/usuarios')

  setUsers(usersFromApi.data)
  
}


async function postUsers(){

    if (
    !inputNome.current.value ||
    !inputEmail.current.value ||
    !inputSenha.current.value
  ) {
    alert("Preencha todos os campos antes de cadastrar!")
    return
  }

if (inputSenha.current.value !== inputConfirmSenha.current.value) {
    alert("As senhas não coincidem!");
    return;
}


   await api.post('/usuarios', {
    nome: inputNome.current.value,
    email: inputEmail.current.value,
    senha: inputSenha.current.value
   })

  getUsers()

  inputNome.current.value = ""
  inputEmail.current.value = ""
  inputSenha.current.value = ""
  inputConfirmSenha.current.value = ""
}


async function deleteUsers(id_cliente){
  await api.delete(`/usuarios/${id_cliente}`)

  getUsers()

}

useEffect (() =>{

  getUsers()

}, [])



  return (
    
      <div className={styles.paginaCadastro}>

        <div className={styles.vazio}></div>

        <main id={styles.form_container}>
            <div id={styles.form_header}>
              <h1 id={styles.form_title}>Cadastre-se</h1>

              <Link to="/" className={ styles ['btn-default'] } id={styles.botaoVoltar}>
                <i className="bi bi-arrow-bar-left"></i>
              </Link>
            </div>

            <section id={styles.info_cadastro}>
              <div className={styles.div_logo}>
              </div>
            </section>
            <section id={styles.form}>
              <div id={styles.input_container}>

                <div className={styles ['input-box']}>
                  <div className={styles ['input-field']}>
                    <input type="text" name="nome" id={styles.name} className={styles ['form-control']} ref={inputNome} placeholder='Nome'/>
                  </div>
                </div>

                <div className={styles ['input-box']}>
                  <div className={styles ['input-field']}>
                    <input type="email" name="email" id={styles.email} className={styles ['form-control']} ref={inputEmail} placeholder='Email'/>
                  </div>
                </div>

                <div className={styles ['input-box']}>
                  <div className={styles ['input-field']}>
                    <input type="password" name="password" id={styles.password} className={styles['form-control']} placeholder='Senha' ref={inputSenha} onChange={avaliarSenha}/>
                  </div>
                  
                {inputSenha.current && inputSenha.current.value.length > 0 && (
                  <div className={styles['forca-container'] + ' ' + styles['forca-absoluta']}>
                    <div className={`${styles['forca-barra']} ${forca.cor}`} style={{ width: forca.largura }} ></div>
                  </div>
                )}

                </div>
                

                <div className={styles ['input-box']}>
                <div className={styles ['input-field']}>
                    <input type="password" name="confirm_password" id={styles.confirm_password} className={styles ['form-control']} placeholder='Repita a senha' ref={inputConfirmSenha}/>
                  </div>
                </div>
              </div>

              <div className={styles.div_botao_default}> 

              <button type="button" className={styles ['btn-default']} id={styles.botaoCadastrar} onClick={postUsers}>Finalizar Cadastro</button>

                  <div className={styles.botoesLogin}>

                    <button type="button" className={styles ['btn-login']}>
                      <img src={Images.logoGoogle} alt="Google logo"/>
                      <p>Continuar com Google</p>
                    </button>

                    <button type="button" className={styles ['btn-login']}>
                       <img src={Images.logoFacebook} alt="Facebook logo"/>
                      <p>Continuar com Facebook</p>
                    </button>

                  </div>
              </div>

              <div className={styles.ajuda_login}>


                <div className={styles ['footer-bottom']}> 

                  <div className={styles.div_ajuda_Login}>

                    <p className={styles.textLogin}>Já tem uma conta? <button onClick={irParaLogin} className={styles ['btn-register']}>Entrar</button> </p>

                    <p className={styles.textLogin}>|</p>

                    <p className={styles.textLogin}><span className={styles.span_text}><button className={styles ['btn-register']}>Esqueceu seu nome?</button></span></p>
                    
                  </div>

                </div>

              </div>

              <div className={styles.footerLogin}>
              
                  <div className={styles.logo_Sportly}>
                    <img src={Images.logoSportly} alt="Sportly logo" />
                  </div>
              
              </div>
            </section>
        </main>

        <div className={styles.card_info_users}>

        { users.map( (user) => (
          <div key={user.id_cliente} className={styles.info_user}>
            <div >
              <p><span className={styles.font_bold}>Nome:</span> {user.nome}</p>
              <p><span className={styles.font_bold}>Email:</span> {user.email}</p>
            </div>
            <button onClick={() => deleteUsers(user.id_cliente)} className={styles.btn_apagar_user}>
              <img src={lixeira} alt="Lixeira"/>
            </button>
          </div>
        ))}
        </div>
      </div>
  )
}

export default Register;