import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import feedbacker from "../../Assets/Projects/feedbacker.png";
import cost from "../../Assets/Projects/cost.png";
import startpage from "../../Assets/Projects/startpage.png";
import detk from "../../Assets/Projects/detk.png";


function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Meus <strong className="purple">projetos</strong>
        </h1>
        <p style={{ color: "white" }}>
          Aqui estão alguns projetos em que trabalhei recentemente.
        </p>
        1
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={feedbacker}
              isBlog={false}
              title="Feedbacker"
              description="Projeto desenvolvido durante um Curso de Vue mestrado pelo Igor Halfeld. Este projeto foi dividido em duas etapas de desenvolvimento. 1- Desenvolver o Dashboard, nele possível realizar filtrar os feedbacks recebidos no widget, visualizar a chave da API e visualizar o script para implementar em seu site.
              2- Desenvolver o Widget, nele é realizado a coleta de feedbacks."
              ghLink="https://github.com/bruno-bento/treinamento-vue3"
              demoLink="https://bruno-bento-feedbacker-dashboard.netlify.app/feedbacks"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cost}
              isBlog={false}
              title="Cost"
              description="Projeto desenvolvido durante um Curso de React mestrado pelo Matheus Battisti."
              ghLink="https://github.com/bruno-bento/projeto-cost"
              demoLink="https://cost.bruno-bento.com/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={startpage}
              isBlog={false}
              title="Start Page"
              description="Uma página inicial para testar conceitos de React e facilitar minha navegação por links frequentementes utilizados."
              ghLink="https://github.com/bruno-bento/startpage"
              demoLink="https://startpage.bruno-bento.com/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={detk}
              isBlog={false}
              title="Grupo DETK"
              description="Landing page desenvolvida para o grupo DETK."
              demoLink="https://grupodetk.com.br/"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
