import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/common/Navbar";

// ... omitindo as linhas não afetadas pela busca ...
// Eu não preciso passar todo o ArticleData, mas a tool precisa do TargetContent exato.
// Melhor eu substituir apenas as linhas do componente ArticlePage.

type Article = {
  title: string;
  image: string;
  content: React.ReactNode;
};

const articlesData: Record<string, Article> = {
  "otimizacao-rotas": {
    title: "Tudo sobre Otimização de Rotas: Como reduzir custos",
    image: "/images/article_1.jpg",
    content: (
      <>
        <p>A otimização de rotas deixou de ser apenas um diferencial competitivo e passou a ser uma necessidade vital para a sobrevivência das empresas de logística modernas. Em um mercado onde o transporte frequentemente representa entre <strong>30% e 60% do custo total</strong> de um produto, encontrar formas de economizar tornou-se a prioridade número um.</p>
        
        <h3>O Fim do Planejamento Manual</h3>
        <p>Apesar de toda a tecnologia disponível, estatísticas recentes mostram que cerca de <strong>72% das empresas</strong> ainda realizam o planejamento de suas rotas de forma manual ou com ferramentas não especializadas. Isso pode gerar um desperdício alarmante de até <strong>25% do orçamento total de combustível</strong>.</p>
        
        <h3>O Impacto da Inteligência Artificial</h3>
        <p>Ao implementar sistemas avançados como o Cargo Truck, os ganhos são quase imediatos e extremamente expressivos:</p>
        <ul>
          <li><strong>Economia Direta de Combustível:</strong> Algoritmos modernos consideram trânsito, janelas de entrega e peso da carga, reduzindo o consumo de combustível entre <strong>10% e 30%</strong>.</li>
          <li><strong>Combate aos "Empty Miles":</strong> A otimização inteligente consegue reduzir em até <strong>25% a quilometragem percorrida por caminhões vazios</strong> (viagens ociosas de retorno).</li>
          <li><strong>Aumento de Produtividade:</strong> Viagens mais rápidas significam que a sua frota atual pode processar até <strong>20% mais pedidos</strong> sem a necessidade de comprar novos veículos.</li>
        </ul>

        <p>A otimização de rotas não apenas protege a saúde financeira da transportadora, mas também alinha a operação às novas exigências e normas de sustentabilidade (ESG), com a redução drástica de emissões de CO₂.</p>
      </>
    )
  },
  "rastreamento": {
    title: "Mitos e verdades sobre rastreamento em tempo real",
    image: "/images/article_2.jpg",
    content: (
      <>
        <p>Quando falamos em rastrear frotas, muitos gestores ainda torcem o nariz por acreditarem que se trata de uma forma de "policiar" motoristas. No entanto, o rastreamento em tempo real provou ser a ferramenta definitiva para elevar o nível de serviço de qualquer transportadora.</p>

        <h3>Verdade: A Pontualidade Dispara</h3>
        <p>A transição de um modelo de gestão "reativo" (apagar incêndios quando a carga atrasa) para um modelo proativo baseado em dados altera o jogo. As transportadoras que utilizam visibilidade total da carga atingem taxas de pontualidade de até <strong>95%</strong>, aumentando imensamente a retenção de contratos B2B de alto valor.</p>

        <h3>Mito: Custa muito caro e é complexo</h3>
        <p>Hoje, plataformas baseadas em nuvem oferecem fácil integração e pagam a si mesmas em poucos meses de operação, especialmente quando consideramos as perdas evitadas com furtos, acidentes ou quebras de contrato.</p>

        <h3>A Revolução da Última Milha (Last Mile)</h3>
        <p>O rastreio é especialmente crítico no "last mile", que é sabidamente a etapa mais cara e ineficiente da logística. A capacidade de prever atrasos por engarrafamentos ou quebras de veículos permite ajustes dinâmicos nas rotas, minimizando prejuízos e mantendo o cliente final sempre informado. Essa transparência se converte na mais poderosa ferramenta de marketing do negócio.</p>
      </>
    )
  },
  "prazos-logistica": {
    title: "Quando os prazos não fecham, por onde começar a organizar?",
    image: "/images/article_3.jpg",
    content: (
      <>
        <p>O pesadelo de todo gestor de frota acontece quando o fim do mês se aproxima e dezenas de entregas começam a atrasar simultaneamente em um efeito dominó. Por onde começar a arrumar a casa quando o caos parece instaurado?</p>

        <h3>1. Abandone as planilhas desconexas</h3>
        <p>O primeiro passo é unificar os dados. Tentar gerenciar motoristas no WhatsApp, cargas no Excel e rotas no papel é a principal receita para falhas. O uso de um painel de controle (Dashboard) unificado devolve a visibilidade sobre o que está, de fato, em trânsito e o que já foi entregue.</p>

        <h3>2. Análise Preditiva e Dados Reais</h3>
        <p>Sistemas como o Cargo Truck não apenas registram dados, mas indicam onde estão os gargalos operacionais. Você gasta mais tempo em processos de carregamento ou nos congestionamentos urbanos? Ter números concretos permite agir na raiz do problema. Operações centralizadas registram ganhos de velocidade de entrega entre <strong>15% e 30%</strong>.</p>

        <h3>3. Foco na Segurança</h3>
        <p>Cumprir prazos nunca deve sobrepor a segurança. Pressionar os profissionais a recuperarem tempo perdido na estrada aumenta exponencialmente a chance de acidentes e multas, o que resulta em prejuízos gigantescos. A organização dos prazos começa no planejamento prévio (Backoffice), garantindo que cada viagem seja matematicamente possível dentro do limite de horas de descanso do motorista.</p>
        
        <p>Investir em um controle tecnológico da frota deixa de ser um luxo e passa a ser a base fundamental para qualquer empresa que queira expandir seus horizontes no próximo ano.</p>
      </>
    )
  }
};

export default function ArticlePage() {
  const { slug } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const article = slug ? articlesData[slug] : null;

  if (!article) {
    return (
      <div className="app-container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <h2>Artigo não encontrado.</h2>
        <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: "2rem" }}>Voltar para o Início</Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <article className="article-page" style={{ padding: "4rem 0 6rem 0", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="app-container" style={{ maxWidth: "800px" }}>
        
        <Link to="/" style={{ color: "var(--brand-blue)", textDecoration: "none", fontWeight: 600, display: "inline-block", marginBottom: "2rem" }}>
          &larr; Voltar
        </Link>
        
        <h1 style={{ fontSize: "2.5rem", color: "#1a1a1a", marginBottom: "2rem", lineHeight: 1.2 }}>
          {article.title}
        </h1>
        
        <img 
          src={article.image} 
          alt={article.title} 
          style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px", marginBottom: "3rem" }} 
        />
        
        <div className="article-body" style={{ color: "#333", fontSize: "1.125rem", lineHeight: 1.8 }}>
          {article.content}
        </div>
        
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid #eee", display: "flex", gap: "1rem" }}>
          <span style={{ fontSize: "0.875rem", color: "#777", fontWeight: 600, textTransform: "uppercase" }}>Compartilhe:</span>
          <a href="#" style={{ color: "var(--brand-blue)" }}>LinkedIn</a>
          <a href="#" style={{ color: "var(--brand-blue)" }}>WhatsApp</a>
          <a href="#" style={{ color: "var(--brand-blue)" }}>E-mail</a>
        </div>
      </div>
    </article>
    </>
  );
}
