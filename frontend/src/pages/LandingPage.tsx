import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/common/Navbar";

export default function LandingPage() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/volume/${trackingId.trim()}`);
    }
  };

  return (
    <div className="landing-page">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="app-container hero-container">
          <div className="hero-content">
            <img src="/images/logo.png" alt="Cargo Truck Oficial" style={{ width: '160px', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }} />
            <h1 className="hero-title">
              O controle de frotas e cargas
              <br /> na palma da mão
            </h1>
            <p className="hero-subtitle">
              Aproveite a inteligência de dados disponível e coloque suas entregas em dia.
            </p>
            
            <form onSubmit={handleSearch} className="hero-action-box">
              <h3>Consulte a situação da sua carga</h3>
              <p>Digite o ID de rastreio</p>
              <input 
                type="text" 
                placeholder="Ex: 1" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="form-input" 
                style={{ marginBottom: '1rem', background: '#fff' }} 
              />
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Consultar Código</button>
            </form>
          </div>

          <div className="hero-image-wrapper">
            <img src="/images/hero.jpg" alt="Pessoa utilizando celular" className="hero-image" />
            <div className="hero-image-decor"></div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="numbers-section">
        <div className="app-container">
          <h2 className="section-title">Estamos presentes na vida de milhares de empresas</h2>
          <div className="numbers-grid">
            <div className="number-card">
              <p>Entregas realizadas com sucesso no prazo estipulado</p>
              <h3>+ 1 milhão</h3>
            </div>
            <div className="number-card">
              <p>Empresas e motoristas parceiros conectados todos os meses</p>
              <h3>+ 70 mil</h3>
            </div>
            <div className="number-card">
              <p>Economia gerada em otimização de rotas e combustível</p>
              <h3>+ R$ 2 bilhões</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Articles / Tips Section */}
      <section className="articles-section">
        <div className="app-container">
          <h2 className="section-title">Dicas para te ajudar a organizar sua logística</h2>
          <div className="articles-grid">
            <div className="article-card">
              <img src="/images/article_1.jpg" alt="Caminhão na estrada" />
              <div className="article-content">
                <h4>Tudo sobre Otimização de Rotas: Como reduzir custos</h4>
                <p>Entenda as novas regras e confira orientações para resolver tudo pelo aplicativo e aproveitar a economia.</p>
                <Link to="/blog/otimizacao-rotas">Acessar</Link>
              </div>
            </div>
            
            <div className="article-card">
              <img src="/images/article_2.jpg" alt="Profissionais no galpão" />
              <div className="article-content">
                <h4>Mitos e verdades sobre rastreamento em tempo real</h4>
                <p>O que realmente muda quando você monitora e como superar receios na hora de reorganizar sua frota.</p>
                <Link to="/blog/rastreamento">Acessar</Link>
              </div>
            </div>

            <div className="article-card">
              <img src="/images/article_3.jpg" alt="Pessoa analisando dados" />
              <div className="article-content">
                <h4>Quando os prazos não fecham, por onde começar a organizar?</h4>
                <p>Identificar prioridades e rever hábitos podem devolver o controle e a tranquilidade e evitar consequências.</p>
                <Link to="/blog/prazos-logistica">Acessar</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="advantages-section">
        <div className="app-container">
          <h2 className="section-title">Conheça as vantagens da nossa plataforma</h2>
          <div className="advantages-grid">
            <div className="advantage-item">
              <div className="adv-icon">⚡</div>
              <p>Otimização de tempo<br/>que pode superar 40%</p>
            </div>
            <div className="advantage-item">
              <div className="adv-icon">🛡️</div>
              <p>Segurança total para<br/>motoristas e cargas</p>
            </div>
            <div className="advantage-item">
              <div className="adv-icon">📱</div>
              <p>Acompanhamento online<br/>até a entrega final</p>
            </div>
            <div className="advantage-item">
              <div className="adv-icon">🤝</div>
              <p>Novas opções de frete<br/>para sua empresa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="app-container">
          <div className="footer-links">
            <div className="footer-column">
              <h4>Nossos produtos</h4>
              <Link to="#">Gestão de Frota</Link>
              <Link to="#">Rastreio Avançado</Link>
              <Link to="#">Inteligência Artificial</Link>
              <Link to="#">Seguros</Link>
            </div>
            <div className="footer-column">
              <h4>Cargo Truck</h4>
              <Link to="#">Relações com investidores</Link>
              <Link to="#">Carreiras</Link>
              <Link to="#">Imprensa</Link>
              <Link to="#">Sustentabilidade</Link>
            </div>
            <div className="footer-column">
              <h4>Ajuda</h4>
              <Link to="#">Central de ajuda</Link>
              <Link to="#">Canais oficias</Link>
              <Link to="#">Encontre filiais</Link>
              <Link to="#">Segurança</Link>
            </div>
            <div className="footer-column">
              <h4>Fale com a gente</h4>
              <Link to="#">Para você</Link>
              <Link to="#">SAC 0800 123 4567</Link>
              <Link to="#">Ouvidoria</Link>
              <Link to="#">Denúncia</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
