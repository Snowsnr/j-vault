import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Letter({ theme }: { theme: 'goth' | 'floral' }) {
  const navigate = useNavigate();
  const isGoth = theme === 'goth';
  const bgColor = isGoth ? 'var(--goth-bg)' : 'var(--floral-bg)';
  const bgCardColor = isGoth ? 'var(--goth-bg-card)' : 'var(--floral-bg-card)';
  const textColor = isGoth ? 'var(--goth-text)' : 'var(--floral-text)';
  const titleColor = isGoth ? '#a2d2ff' : 'var(--main-blue)';

  return (
    <div className="page-container animate-fade-in" style={{ background: bgColor, paddingBottom: '100px' }}>
      <div className="page-header" style={{ borderBottom: 'none' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'transparent', border: 'none', color: titleColor,
          padding: '0.5rem', cursor: 'pointer'
        }}>
          <ArrowLeft size={32} />
        </button>
      </div>

      <div className="letter-wrapper animate-fade-in" style={{
        background: bgCardColor, color: textColor,
        position: 'relative', border: isGoth ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
        boxShadow: isGoth ? '0 20px 50px rgba(0,0,0,0.5)' : '0 20px 50px rgba(0,0,0,0.1)'
      }}>

        {/* Decoraciones de esquina */}
        <img
          src={isGoth ? '/img/snkicon.png' : '/img/lirios2.png'}
          alt="Decoration Top"
          className="letter-decoration"
          style={{
            top: '-10px', right: '-10px',
            opacity: isGoth ? 0.15 : 0.5, transform: 'rotate(15deg)'
          }}
        />
        <img
          src={isGoth ? '/img/thgicon.png' : '/img/gerberas2.png'}
          alt="Decoration Bottom"
          className="letter-decoration"
          style={{
            bottom: '-10px', left: '-10px',
            opacity: isGoth ? 0.15 : 0.5, transform: 'rotate(-25deg)'
          }}
        />

        <div className="letter-content" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 className="letter-title" style={{
              color: titleColor, fontSize: '3.5rem', marginBottom: '0.5rem',
              textShadow: isGoth ? '0 2px 10px rgba(0,0,0,0.5)' : 'none'
            }}>
              Para Jess
            </h1>
            <div style={{
              width: '60px', height: '3px', background: titleColor, margin: '0 auto', borderRadius: '2px', opacity: 0.7
            }}></div>
          </div>

          <p className="letter-text">
            Hola mor<br /><br />
            Espero que tengas un cumpleaños maravilloso, seguro ya estás cansada de escucharlo, pero eres una chica
            increíble, talentosa, inteligente, creativa, hermosa y un sinfin de cosas más que podría listar todo el día,
            pero es que de verdad lo pienso, desde que te conozco, y más aún este último año, que claro, ha tenido sus altos y bajos,
            pero sigue siendo igual de especial.
            <br /><br />
            Entiendo mucho esa sensación de que tu cumpleaños no es la gran cosa y que estés acostumbrada a que las cosas
            no vayan como esperabas, lamento mucho eso, pero quiero que sepas que para mi, es de las fechas más especiales,
            llevo tiempo esperando con ansias que llegara este día, con la esperanza de poder hacerlo aunque sea un poco especial y
            memorable para ti, me gustaría poder llevarte a un lugar
            bonito y especial, darte flores, pasar todo el día contigo y que te puedas olvidar de todo lo demás, es mi mayor
            deseo, lamentablemente aún no lo puedo cumplir, pero me esfuerzo cada día para hacerlo realidad, me gustaría pasar
            mi vida a tu lado, poder abrazarte y verte todos los días, pero tendremos que ser pacientes, es por eso que fue un reto elegir un regalo que fuera especial,
            que pueda romper la barrera fisica que nos separa y que fuese algo que realmente te guste y puedas disfrutar más de una vez.
            Entonces me puse a pensar y fue lógico imaginar un regalo que pudiera crear con las habilidades que he aprendido en mi carrera,
            lo que no fue tan lógico fue el qué, no quería que fuera algo centrado en nosotros, como fotos que hemos tomado
            en juegos o algo simple como una página bonita que solo verías el día de tu cumpleaños, quería que fuer algo
            centrado en ti, que tu fueras la protagonista y que te puedas sentir identificada con la temática.
            <br /><br />
            Entonces pensé en todas las cosas que sé que te gustan, relacionadas con el anime, mangas, videojuegos, libros, música, etc,
            como ya tienes donde ver anime, jugar tus juegos favoritos y donde escuchar música, hacer algo relacionado con eso
            aunque fuera bonito, no sería algo muy útil, por lo que las descarté, entonces pensé en que podría hacer con los mangas,
            no te los puedo regalar en físico, pero sí podía buscarlos y recopilarlos en un sitio que puedas visitar siempre que los quieras leer,
            sin tener que arriesgarte a visitar páginas inseguras, que podrían tirar en cualquier momento o que dependieras del
            internet para leerlos, sigo con dudas si es algo que
            realmente te gustaría pero fue lo mejor que pude pensar, entonces decidí no agregar tantas cosas en caso de que
            no sea algo que ocuparías, pero en caso de que te guste, sientete libre de pedirme cualquier manga, libro, pelicula o
            cualquier cosa que te gustaría que estuviera aquí, yo haré todo lo posible para hacerlo realidad.
            <br /><br />
            Espero que sea de tu agrado, no es mucho, pero lo hice con mucho cariño para ti, eres lo mejor que me ha pasado,
            haces mis días felices, eres una de mis razones para despertar y seguir adelante, aunque haya temporadas no tan buenas, nunca he
            dejado de amarte, quiero seguir conociendote a ti y a tu mundo, quiero verte mejorar, que puedas ser la persona que
            desees ser, que cumplas todo lo que te propongas y que puedas decir que tuviste a alguien que nunca dudó de ti, te
            acompañó en todo el camino y te apoyó, quiero que puedas verme como alguien en quien confiar, alguien a quien le
            puedas entregar tu corazon sin miedo a ser lastimada, que incluso en los días más pesados, sepas que puedes contar
            conmigo y que eso de alguna forma sea un alivio.
            <br /><br />
            Ya me extendí un poco así que quiero terminar esta carta recordandote lo valiosa que eres y lo capaz que eres,
            no conozco a ninguna persona tan dedicada y fuerte como tú, sigue siendo tú, haz todas las cosas que te gustan sin
            miedo a ser juzgada, dibuja, baila, lee, canta, escribe, juega y expresate de la forma que solo tú sabes hacer, eso
            te hace muy especial y es una de las razones por las cuales estoy tan enamorado de ti.
            <br /><br />
            Con mucho cariño,<br />
            Diego
          </p>
        </div>
      </div>
    </div>
  );
}
