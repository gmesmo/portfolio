type WinContentProps = {
  winName: string
}

const WinContent = ({ winName }: WinContentProps) => {
  switch (winName) {
    case 'SOBRE MIM':
      return <About />
    case 'PROJETOS':
      return <Projects />
    case 'CONTATO':
      return <Contact />
  }

  return <div>Conteúdo não disponível</div>
}

const About = () => {
  return <div>About</div>
}

const Projects = () => {
  return <div>Projects</div>
}

const Contact = () => {
  return <div>Contact</div>
}

export default WinContent
