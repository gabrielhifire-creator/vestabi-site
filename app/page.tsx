const whatsappHref =
  "https://wa.me/5571981995565?text=Ol%C3%A1%2C%20quero%20entender%20como%20a%20Vesta%20pode%20ajudar%20minha%20empresa%20a%20organizar%20dados%2C%20reduzir%20retrabalho%20e%20melhorar%20processos%20operacionais.";

const emailHref =
  "mailto:contato@vestabi.com?subject=Contato%20pelo%20site%20da%20Vesta";

const problems = [
  "Demandas repetitivas sobrecarregam as equipes de atendimento",
  "Planilhas, sistemas e conversas permanecem desconectados",
  "Relatórios e protocolos exigem horas de trabalho manual",
  "A gestão decide com atraso e visão incompleta",
];

const solutions = [
  {
    number: "01",
    title: "Diagnóstico operacional",
    text: "Mapeamos gargalos, padrões e riscos nos processos atuais.",
  },
  {
    number: "02",
    title: "Organização dos dados",
    text: "Organizamos dados relevantes em uma visão clara para a gestão.",
  },
  {
    number: "03",
    title: "Automação assistida",
    text: "Reduzimos tarefas repetitivas, preservando a supervisão humana.",
  },
  {
    number: "04",
    title: "Monitoramento recorrente",
    text: "Disponibilizamos alertas, indicadores e resumos gerenciais para acompanhamento contínuo.",
  },
];

const process = [
  ["Entender", "Compreendemos o processo, as pessoas envolvidas e o objetivo."],
  ["Analisar", "Identificamos dados disponíveis, lacunas e pontos de retrabalho."],
  ["Priorizar", "Selecionamos o gargalo de maior relevância para iniciar."],
  ["Implantar", "Colocamos a primeira rotina em operação de forma assistida."],
  ["Evoluir", "Aprimoramos a solução com base no uso e nos resultados observados."],
];

const applications = [
  "Análise de atendimentos para identificar demandas recorrentes",
  "Organização de relatórios e protocolos recorrentes",
  "Alertas para riscos operacionais",
  "Elaboração de resumos executivos para gestores",
  "Automação assistida de rotinas administrativas",
];

const faqs = [
  {
    question: "A Vesta substitui o sistema que minha empresa já usa?",
    answer:
      "Não. A Vesta atua sobre os processos, sistemas e dados que a empresa já utiliza.",
  },
  {
    question: "É necessário ter os dados organizados?",
    answer:
      "Não. A organização das informações existentes e a identificação de lacunas fazem parte do diagnóstico.",
  },
  {
    question: "A Vesta substitui profissionais?",
    answer:
      "Não. O objetivo é reduzir tarefas repetitivas e disponibilizar informações mais claras para apoiar o trabalho das equipes.",
  },
  {
    question: "Como a Vesta lida com dados sensíveis?",
    answer:
      "Adotamos o princípio do acesso mínimo necessário e, sempre que possível, trabalhamos com informações agregadas.",
  },
];

function ContactIcon({ type }: { type: "whatsapp" | "email" }) {
  return (
    <span className={`contact-icon contact-icon--${type}`} aria-hidden="true" />
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className="site-header" data-mobile-navigation>
        <div className="shell header-inner">
          <a className="brand" href="#inicio" aria-label="Vesta - início">
            {/* Keep the approved brand asset untouched by image optimization. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vesta-logo-light.png" alt="Vesta" />
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#problema">Desafios</a>
            <a href="#como-ajudamos">Soluções</a>
            <a href="#metodo">Método</a>
            <a href="#faq">Perguntas</a>
          </nav>

          <div className="header-actions" aria-label="Contatos da Vesta">
            <a
              className="header-contact header-contact--email"
              href={emailHref}
              aria-label="Enviar e-mail para a Vesta"
            >
              <ContactIcon type="email" />
            </a>
            <a
              className="header-contact header-contact--whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Falar com a Vesta pelo WhatsApp"
            >
              <ContactIcon type="whatsapp" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          <button
            className="mobile-menu-trigger"
            type="button"
            aria-expanded="false"
            aria-controls="mobile-menu-panel"
            aria-label="Abrir menu de navegação"
            data-mobile-menu-trigger
          >
            <span className="mobile-menu-icon" aria-hidden="true" />
            <span>Menu</span>
          </button>
        </div>

        <nav
          className="mobile-menu-panel"
          id="mobile-menu-panel"
          aria-label="Navegação móvel"
          data-mobile-menu-panel
          hidden
        >
          <div className="mobile-menu-grid">
            <a className="mobile-menu-link" href="#problema">
              Desafios
            </a>
            <a className="mobile-menu-link" href="#como-ajudamos">
              Soluções
            </a>
            <a className="mobile-menu-link" href="#metodo">
              Método
            </a>
            <a className="mobile-menu-link" href="#faq">
              Perguntas
            </a>
          </div>

          <a className="mobile-menu-email" href={emailHref}>
            <ContactIcon type="email" />
            <span>Enviar e-mail</span>
          </a>
        </nav>
      </header>

      <main id="conteudo">
        <section className="hero section-anchor" id="inicio">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Inteligência operacional aplicada</p>
              <h1>Menos retrabalho. Mais clareza para operar.</h1>
              <p className="hero-lead">
                A Vesta identifica gargalos, organiza dados e estrutura rotinas
                para reduzir o trabalho manual e apoiar decisões de gestão.
              </p>

              <div className="hero-actions">
                <a
                  className="button button--primary"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ContactIcon type="whatsapp" />
                  Falar com a Vesta
                </a>
                <a className="button button--secondary" href={emailHref}>
                  <ContactIcon type="email" />
                  Enviar e-mail
                </a>
              </div>

              <p className="hero-note">
                Na primeira conversa, identificamos o principal gargalo e um
                ponto de partida viável.
              </p>
            </div>

            <aside className="diagnostic-card" aria-label="Abordagem inicial da Vesta">
              <p className="card-kicker">Ponto de partida</p>
              <h2>Começamos pela realidade da operação.</h2>
              <p>
                Analisamos quais etapas consomem mais tempo e qual iniciativa
                pode gerar valor primeiro.
              </p>

              <ol className="diagnostic-list">
                <li>
                  <span>01</span>
                  <strong>Em quais etapas a operação perde mais tempo?</strong>
                </li>
                <li>
                  <span>02</span>
                  <strong>Quais dados estão disponíveis?</strong>
                </li>
                <li>
                  <span>03</span>
                  <strong>Qual melhoria deve ser priorizada?</strong>
                </li>
              </ol>
            </aside>
          </div>
        </section>

        <section className="problem section-anchor" id="problema">
          <div className="shell">
            <div className="section-heading section-heading--wide">
              <p className="section-label">Desafios operacionais</p>
              <h2>Os dados existem. A visibilidade ainda é limitada.</h2>
              <p>
                Quando informações de atendimentos, planilhas, relatórios e
                conversas não se conectam, o impacto se traduz em perda de tempo,
                decisões tardias e retrabalho.
              </p>
            </div>

            <div className="problem-grid">
              {problems.map((problem, index) => (
                <article className="problem-item" key={problem}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{problem}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="solution section-anchor" id="como-ajudamos">
          <div className="shell">
            <div className="section-heading">
              <p className="section-label">Como a Vesta ajuda</p>
              <h2>Da informação dispersa a uma rotina de gestão.</h2>
              <p>
                Diagnóstico e tecnologia aplicados a desafios concretos da operação.
              </p>
            </div>

            <div className="solution-grid">
              {solutions.map((solution) => (
                <article className="solution-card" key={solution.number}>
                  <span className="solution-number">{solution.number}</span>
                  <h3>{solution.title}</h3>
                  <p>{solution.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process section-anchor" id="metodo">
          <div className="shell process-layout">
            <div className="process-intro sticky-section-intro">
              <p className="section-label section-label--light">Como funciona</p>
              <h2>Cinco etapas para uma primeira entrega útil.</h2>
              <p>
                A tecnologia é definida a partir da necessidade operacional,
                não o contrário.
              </p>
            </div>

            <ol className="process-list">
              {process.map(([title, text], index) => (
                <li key={title}>
                  <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="applications section-anchor" id="aplicacoes">
          <div className="shell applications-layout">
            <div className="section-heading sticky-section-intro">
              <p className="section-label">Aplicações práticas</p>
              <h2>Onde a Vesta atua na operação.</h2>
              <p>
                Exemplos de aplicação adaptáveis a diferentes contextos operacionais.
              </p>
            </div>

            <ul className="application-list">
              {applications.map((application, index) => (
                <li key={application}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{application}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="trust">
          <div className="shell trust-grid">
            <div className="sticky-section-intro">
              <p className="section-label">Confiança pelo método</p>
              <h2>Começar de forma controlada. Medir o que importa.</h2>
            </div>

            <div className="trust-points">
              <article>
                <span>01</span>
                <div>
                  <h3>Implantação assistida</h3>
                  <p>Implantação gradual, acompanhada e ajustável.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Acesso mínimo necessário</h3>
                  <p>Acesso restrito aos dados necessários para cada projeto.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Medição baseada em resultados</h3>
                  <p>Resultados operacionais acompanhados com critérios objetivos.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="faq section-anchor" id="faq">
          <div className="shell faq-layout">
            <div className="section-heading faq-heading sticky-section-intro">
              <p className="section-label">Perguntas frequentes</p>
              <h2>Antes da primeira conversa.</h2>
            </div>

            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="shell final-cta-inner">
            <div>
              <p className="section-label section-label--light">Próximo passo</p>
              <h2>Qual processo mais consome tempo na sua operação?</h2>
              <p>
                Compartilhe os principais gargalos. Na primeira conversa,
                identificamos um ponto de partida viável.
              </p>
            </div>

            <div className="final-actions">
              <a
                className="button button--copper"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <ContactIcon type="whatsapp" />
                Falar no WhatsApp
              </a>
              <a className="email-link" href={emailHref}>
                <ContactIcon type="email" />
                contato@vestabi.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-inner">
          <p>Vesta é uma marca de inteligência operacional aplicada.</p>
          <p>© 2026 Vesta</p>
        </div>
      </footer>
    </>
  );
}
