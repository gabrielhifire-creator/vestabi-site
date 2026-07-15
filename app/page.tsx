const whatsappHref =
  "https://wa.me/5571981995565?text=Ol%C3%A1%2C%20quero%20entender%20como%20a%20Vesta%20pode%20ajudar%20minha%20empresa%20a%20organizar%20dados%2C%20reduzir%20retrabalho%20e%20melhorar%20processos%20operacionais.";

const emailHref =
  "mailto:contato@vestabi.com?subject=Contato%20pelo%20site%20da%20Vesta";

const problems = [
  "Demandas repetitivas sobrecarregam o atendimento",
  "Planilhas, sistemas e conversas não se conectam",
  "Relatórios e protocolos consomem horas de trabalho manual",
  "Gestores decidem tarde e sem visão completa",
];

const solutions = [
  {
    number: "01",
    title: "Diagnóstico operacional",
    text: "Mapeamos gargalos, padrões e riscos no fluxo real.",
  },
  {
    number: "02",
    title: "Organização dos dados",
    text: "Conectamos dados úteis em uma leitura simples para a gestão.",
  },
  {
    number: "03",
    title: "Automação assistida",
    text: "Reduzimos tarefas repetitivas sem retirar a supervisão humana.",
  },
  {
    number: "04",
    title: "Monitoramento recorrente",
    text: "Geramos alertas, indicadores e resumos gerenciais.",
  },
];

const process = [
  ["Entender", "Conhecemos o fluxo, as pessoas e o objetivo."],
  ["Analisar", "Localizamos dados, lacunas e retrabalho."],
  ["Priorizar", "Escolhemos um gargalo relevante para começar."],
  ["Implantar", "Colocamos uma primeira rotina em uso assistido."],
  ["Evoluir", "Ajustamos a solução a partir do uso real."],
];

const applications = [
  "Análise de atendimentos para identificar demandas repetitivas",
  "Organização de relatórios e protocolos recorrentes",
  "Alertas de risco operacional",
  "Resumos executivos para gestores",
  "Automação assistida de rotinas administrativas",
];

const faqs = [
  {
    question: "A Vesta substitui o sistema que minha empresa já usa?",
    answer:
      "Não. A Vesta trabalha sobre os fluxos, sistemas e dados que a empresa já possui.",
  },
  {
    question: "É preciso ter os dados organizados ou perfeitos?",
    answer:
      "Não. Organizar o que existe e identificar lacunas faz parte do diagnóstico.",
  },
  {
    question: "A Vesta substitui pessoas?",
    answer:
      "Não. O objetivo é reduzir retrabalho e preparar melhor o trabalho humano.",
  },
  {
    question: "Como a Vesta lida com dados sensíveis?",
    answer:
      "Com acesso mínimo necessário e preferência por resultados agregados.",
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

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#inicio" aria-label="Vesta - início">
            {/* Keep the approved brand asset untouched by image optimization. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vesta-logo-light.png" alt="Vesta" />
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#problema">Dores</a>
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
        </div>
      </header>

      <main id="conteudo">
        <section className="hero section-anchor" id="inicio">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Inteligência operacional aplicada</p>
              <h1>Menos retrabalho. Mais clareza para operar.</h1>
              <p className="hero-lead">
                A Vesta identifica gargalos, organiza dados e cria rotinas para
                reduzir trabalho manual e apoiar a gestão.
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
                Em uma conversa, mapeamos o gargalo e uma primeira rotina possível.
              </p>
            </div>

            <aside className="diagnostic-card" aria-label="Abordagem inicial da Vesta">
              <p className="card-kicker">Ponto de partida</p>
              <h2>Começamos pelo fluxo real.</h2>
              <p>
                Entendemos onde o tempo se perde e qual entrega pode gerar clareza primeiro.
              </p>

              <ol className="diagnostic-list">
                <li>
                  <span>01</span>
                  <strong>Onde o tempo se perde?</strong>
                </li>
                <li>
                  <span>02</span>
                  <strong>Quais dados já existem?</strong>
                </li>
                <li>
                  <span>03</span>
                  <strong>O que deve melhorar primeiro?</strong>
                </li>
              </ol>
            </aside>
          </div>
        </section>

        <section className="problem section-anchor" id="problema">
          <div className="shell">
            <div className="section-heading section-heading--wide">
              <p className="section-label">O problema</p>
              <h2>Dados existem. Visibilidade, nem sempre.</h2>
              <p>
                Quando atendimentos, planilhas, relatórios e conversas não se conectam,
                o custo aparece em tempo perdido, decisões tardias e retrabalho.
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
                Diagnóstico e tecnologia aplicados a um problema concreto da operação.
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
            <div className="process-intro">
              <p className="section-label section-label--light">Como funciona</p>
              <h2>Cinco passos. Uma primeira entrega útil.</h2>
              <p>
                Entender, priorizar e implantar sem começar por software pronto.
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
            <div className="section-heading">
              <p className="section-label">Aplicações práticas</p>
              <h2>Onde a Vesta entra no dia a dia.</h2>
              <p>
                Exemplos concretos, adaptáveis a diferentes operações.
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
            <div>
              <p className="section-label">Confiança pelo método</p>
              <h2>Começar pequeno. Medir o que importa.</h2>
            </div>

            <div className="trust-points">
              <article>
                <span>01</span>
                <div>
                  <h3>Implantação assistida</h3>
                  <p>Uso gradual, acompanhado e ajustável.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Acesso mínimo necessário</h3>
                  <p>Dados tratados conforme a necessidade do projeto.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Medição sem promessa vazia</h3>
                  <p>Uso e ganho operacional observados na prática.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="faq section-anchor" id="faq">
          <div className="shell faq-layout">
            <div className="section-heading faq-heading">
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
              <h2>Qual rotina mais consome tempo hoje?</h2>
              <p>
                Conte onde estão os gargalos. A primeira conversa identifica um ponto de partida.
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
