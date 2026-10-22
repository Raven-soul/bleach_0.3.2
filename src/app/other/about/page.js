import { PageLoad } from "@/components/page_part/service_user/Load";
import { AboutImage } from "./../service_user/art_workshop"

export default function Home(param) {
  const { data } = param;
  const page_title = 'О проекте';  

  return (
    <div className="row-2">
        <div className="col chapter-title-mobile">{page_title}</div>
        <div className="col">
            <PageLoad page_title={page_title} />
            <div className="news-area"> 
                <div className="main-brown-data-area">
                    <div className="main-content-block">
                        <div className="title-block">
                            <div className="row-2 about-area">
                                <div className="col news-name">
                                    Сайт для игры в D&D 5e во вселенной Bleach
                                </div>
                                <div className="col news-description"></div>
                                <div className="news-content">                                            
                                    <p>
                                        Интересная задумка, которая развивается вместе с ее автором. Этот сайт начинал свое путешествие в далеком 2023 году, в качестве идеи 
                                        "А что, если..?". Однако, со временем перерос в нечто осязаемое, то, что можно потыкать, поклацать и прочитать.
                                    </p>
                                    <p>
                                        Версия за версией, сайт приобретал свои функциональные и визуальные черты. Его рост сопровождался ростом количества данных, которые он демонстрирует пользователям. 
                                    </p>
                                    <p>
                                        На этой странице будут указаны источники, которые легли в основу проекта, и без которых его реализация была бы невозможна.
                                    </p>
                                </div>
                                <div className="col my-2">
                                    <hr/>
                                    <div className="row px-2">
                                        <div className="col py-3" style={{display:"flex", alignItems:"center"}}>
                                            <div>
                                                <h1>Внешний вид</h1>
                                                <p className="my-2">
                                                    За основу внешнего вида был взят всеми любимый сайт <a href="https://dnd.su"><span>dnd.su</span></a>. 
                                                </p>
                                                <p className="my-2">
                                                    Однако, укажу. У меня нет доступа к подкопотной части их сайта. Я могу и использую только его элементы, 
                                                    которые расположены в общем доступе и доступны всем желающим.
                                                </p>
                                                <p className="my-2">
                                                    Расхождения в стилях есть и я, автор, не стремлюсь их убрать. То, как внутри строится этот сайт, 
                                                    является моей авторской задумкой, и не претендует ни на чьи права.
                                                </p>
                                            </div>                                            
                                        </div>
                                        <div className="col py-3" style={{display:"flex", alignItems:"center"}}>
                                            <AboutImage image={'9f0acac7e6440c82160ba1d8ff888bf223.png'} name={'D&D logo'}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col my-2">
                                    <div className="row px-2">
                                        <div className="col py-3" style={{display:"flex", alignItems:"center"}}>
                                            <AboutImage image={'5d0910ef6b1ec221d6fbdf65b2bc2290.png'} name={'bleach logo'}/>
                                        </div>
                                        <div className="col py-3" style={{display:"flex", alignItems:"center"}}>
                                            <div>
                                                <h1>Текст и правила</h1>
                                                <p className="my-2">
                                                    Тут чуть сложнее все. За основу материала сайта был взят труд иностранного источника <a href="https://www.gmbinder.com/share/-LkO8VBLAIck6JlLwS_7"><span>dixyn0rmous</span></a>. 
                                                    Полностью на английском языке.
                                                </p>
                                                <p className="my-2">
                                                    Это хоумбрую правила собственной задумки автора с опорой на основные правила D&D и дополнения к ней.
                                                </p>    
                                                <p className="my-2">
                                                    Материал полный и обновляющийся. Однако автор этого сайта имеет свой собственный взгляд на правила для вселенной 
                                                    bleach, и эти взгляды не соответствуют взглядам автора хоумбрю издания. 
                                                </p>
                                                <p className="my-2">
                                                    У автора хоумбрю есть, как и гениальные идеи, так и откровенно сомнительные. По этому, изначально при создании 
                                                    сайта было заложена мысль, взять труды <a href="https://www.gmbinder.com/share/-LkO8VBLAIck6JlLwS_7"><span>dixyn0rmous</span></a> только в качестве основы, и в дальнейшем доработать, внося 
                                                    собственные правки, и переделывая правила на свой лад.
                                                </p>
                                            </div>                                            
                                        </div>                                      
                                    </div> 
                                    <hr/> 
                                </div>
                                <div className="col my-2">
                                    <div className="row px-2">
                                        <div className="col py-3" style={{display:"flex", alignItems:"center"}}>
                                            <div>
                                                <h1>Отдельно</h1>
                                                <p className="my-2">
                                                    Данный проект не является коммерческим, создан исключительно для развлечения и не претендует ни на какие права первоисточников. 
                                                </p>
                                            </div>
                                        </div>  
                                        <div className="col py-3" style={{display:"flex", alignItems:"center"}}>
                                            <AboutImage image={'bleach-recap-79-09.png'} name={'bleach logo'}/>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                    
        </div>
    </div>      
  );
}
