import { useState, useRef } from 'react';
import styles from './style.module.css';
import api from '../../services/api'
import { Link, useNavigate } from "react-router-dom";
import * as Images from '../../assets'; // Importa todas as imagens de forma organizada


function Login() {

  const navigate = useNavigate();

  const inputEmail = useRef();
  const inputSenha = useRef();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Função de login
  const loginUser = async () => {
    if (!inputEmail.current.value || !inputSenha.current.value) {
      alert("Preencha todos os campos antes de entrar!");
      return;
    }

    try {
      const response = await api.post('/login', {
        email: inputEmail.current.value,
        senha: inputSenha.current.value
      });

      // Salvar token no localStorage
      localStorage.setItem('token', response.data.token);
      setShowSuccessModal(true);
      setTimeout(() => navigate('/'), 1400);
      
      // Redirecionar para dashboard
      
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  
  
  // Função para ir para cadastro
  function irParaRegister() {
    navigate('/register');
}

  return (
    <div className={styles.paginaLogin}>
      <main id={styles.form_container}>
        <div id={styles.form_header}>
          <h1 id={styles.form_title}>Entrar</h1>
          <Link to="/" className={styles ['btn-default']} id={styles.botaoVoltar}>
            <i className="bi bi-arrow-bar-left"></i>
          </Link>
        </div>
            {showSuccessModal && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                  <h2>Login efetuado</h2>
                  <p>Você entrou com sucesso!</p>
                </div>
              </div>
            )}

        <form id={styles.form}>
              <div id={styles.input_container}>
                
                <div className={styles ['input-box']}>
                  <div className={styles ['input-field']}>
                    <input type="email" name="email" id={styles.email} className={styles ['form-control']} ref={inputEmail} placeholder='Email'/>
                  </div>
                </div>

                <div className={styles ['input-box']}>
                  <div className={styles ['input-field']}>
                    <input type="password" name="password" id={styles.password} className={styles ['form-control']} placeholder='Senha' ref={inputSenha}/>
                  </div>
                </div>

              </div>

              <div className={styles.div_botao_default}> 
                  <button type="button" className={styles ['btn-default']} id={styles.botaoCadastrar}  onClick={loginUser}>Entrar</button>

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

                    <p className={styles.textLogin}>Não tem uma conta? <button onClick={irParaRegister} className={styles ['btn-register']}>Cadastre-se</button> </p>

                    <p className={styles.textLogin}>|</p>

                    <p className={styles.textLogin}><span className={styles.span_text}><button className={styles ['btn-register']}>Esqueceu sua senha?</button></span></p>
                    
                  </div>

                </div>

              </div>


              <div className={styles.footerLogin}>
 
                  <div className={styles.logo_Sportly}>
                    <img src={Images.logoSportly} alt="Sportly logo" />
                  </div>

              </div>

            </form>
      </main>
    </div>
  )
}

export default Login

