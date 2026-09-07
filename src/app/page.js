import { PageLoad } from "@/components/page_part/common/user_side/Load";
import { NewsImage } from "./user_side/news_articles"

export default function Home(param) {
  const { data } = param;

  return (
    <div className="row-2">
                <div className="col news-chapter-title">{"Новости сайта"}</div>
                <div className="col">
                    <PageLoad page_title={"Новости сайта"} />
                    <div className="row2">
                        {/* вот тут можно множить записи, чтобы получались бежевые карточки )) */}
                        <div className="news-area"> 
                            <div className="main-brown-data-area">
                                <div className="main-content-block">
                                    <div className="title-block">
                                        <div className="row-2">
                                            <div className="col news-name">
                                                Совсем не дайджест
                                            </div>
                                            <div className="col news-description">
                                                <p>Краткая заглушка, нужна, правда нужна )).</p>
                                            </div>
                                            <NewsImage 
                                                image={'3e1bda88edd8f6fd72811b3e0385472b.jpg'}
                                                height={616}
                                                width={474}
                                                name={'Zaraki'}
                                            />
                                            <div className="news-content">                                            
                                                <p>
                                                    Наконец завершились тяжелые и мучительные работы со способностями.
                                                    Это путешествие длилось больше двух лет, пережило несколько версий реализаций,
                                                    дождалось появления базы и правок.. 505 страшных способностей встали на свое место.
                                                </p>
                                                <p>
                                                    Теперь я могу уделить внимание остальным аспектам сайта.. Я немного закостенел.. Работа с данными 
                                                    учит только быстро работать с данными, выискивать в десятках и сотнях записей лишние запятые и точки, корявые слова и переводы.
                                                    я уже сейчас могу сказать, что делать это новостное окошко оказалось не из легких.
                                                </p>
                                                <p>
                                                    Но, заметьте, оно есть, и вы его читаете )). Работа сдвинулась с мертвой точки <i>(*тяжелый вздох* в который тить его раз)</i>.
                                                    План действий оглашать не буду.. Не знаю как он изменится в процессе.. но уверяю, сейчас я хочу создать персонажа, любого..
                                                    играбельного, по своим правилам. И сделаю это!
                                                </p>
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
