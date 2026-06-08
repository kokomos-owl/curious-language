import React from 'react';
import { Link } from 'react-router-dom';

/*
  curiouslanguage.io/habitat — the destination for "Habitat" references across
  Curious and the Habitat Foundation (e.g. habitatfdn.org/learn links here).

  Copy: the "position, not a conversion" framing (a fixed encoder places, never
  acts/generates) + the said/implied/unspoken bridge to the Curious brand line +
  the established/not-established candor. Em-dashes held to one (in "Established").
  Entity framing is neutral: two aligned entities with a license between them.
*/
export default function HabitatPage() {
  return (
    <div className="hp-scroll">
      <header className="hp-header">
        <div className="hp-brand">
          {/* wordmark zone — drop the SVG here later */}
          <Link className="hp-wordmark" to="/">Curious</Link>
        </div>
        <nav className="hp-nav">
          <Link className="hp-navlink" to="/habitat">Habitat</Link>
        </nav>
      </header>

      <main className="hp-main">
        <p className="hp-kicker">The instrument</p>
        <h1 className="hp-title">Habitat</h1>

        <p className="hp-lede">
          Every system that reads your writing converts it. It takes what you wrote and turns it into
          something to act on: a prediction, a recommendation, a generated reply. To do that, it has to
          step outside your language and decide what your words were really for.
        </p>

        <hr className="hp-rule" />

        <p className="hp-body">
          Habitat does not. It observes the shape your writing already has and hands that shape back to
          you. It does not convert, predict, or recommend. The only thing it ever does to your words is
          read them into a measurement, and then it stays out of the way.
        </p>
        <p className="hp-body">
          That difference is small to state and large in consequence. A system that converts has to stand
          above you. A system that only observes can stay beside you. That is what lets it sit between you
          and the models you work with, without ever handing them your words.
        </p>

        <h2 className="hp-h2">What it is</h2>
        <p className="hp-body">
          Habitat is a non-generative instrument. It runs two readings of a composition at once. One reads
          structure: who acts, what is asserted, who is affected. The other reads meaning: where the
          composition sits in a fixed semantic space. That second reading is a position, not a conversion:
          a reader that places your writing, never an agent that changes it.
        </p>
        <p className="hp-body">
          Neither reading is the other. What Habitat actually measures is the relationship between them:
          how structure and meaning move together as you compose. The two never line up perfectly, and the
          gap between them is not an error to close. The gap is the signal.
        </p>
        <p className="hp-body">
          This is what Curious means by measuring expression. What is <strong>said</strong>, what is
          {' '}<strong>implied</strong>, and what goes <strong>unspoken</strong>: the dimension a
          composition states outright, the ones it leans on without naming, and the one it is so unanimous
          about that it never surfaces on its own, only in how it bends the rest.
        </p>

        <h2 className="hp-h2">How it works</h2>
        <p className="hp-body">
          <strong>You compose.</strong> A composition enters the field. The act is yours, not the
          instrument&rsquo;s. Your words are read into structure and into a position in meaning, and they
          go no further: nothing generative ever receives them, and they never become training data. What
          enters the field is the measurement, not the text.
        </p>
        <p className="hp-body">
          <strong>The field deforms.</strong> There is no separate step where something reads a meter; the
          deformation is the observation. A dimension your writing leans on hard crosses a threshold and
          becomes legible. A dimension your writing is quietly unanimous about stays silent on its own, but
          shows up in how it pulls on the others.
        </p>
        <p className="hp-body">
          <strong>Each reading conditions the next.</strong> Every composition becomes the ground the next
          is read against. The field holds its whole history in its present shape, not a snapshot but the
          sum of everything composed into it. It never resolves to a final answer, by design. A reading is
          alive only at the moment it is taken; compose again, and it must be taken again.
        </p>

        <h2 className="hp-h2">What it returns</h2>
        <p className="hp-body">
          Habitat returns the contour of what it measured: the strongest couplings, the oppositions, where
          your structure concentrates, where it is still forming. A reading might say, for instance:{' '}
          <em>this composition contests who can act, leans hard on who is affected, and is silently
          unanimous about time.</em> When it puts a contour into words, it speaks only from the measurement,
          never from words it never received, never from a guess past where the measurement stops.
        </p>
        <p className="hp-body">
          You read the contour and make your own meaning of it. The instrument does not make the meaning
          for you, and it cannot. Meaning is not a hidden target it is groping toward; meaning is the use
          itself, present in your composing, and the instrument stays inside it rather than standing over
          it.
        </p>

        <h2 className="hp-h2">Why this is sovereign</h2>
        <p className="hp-body">
          The sovereignty is structural, not a policy laid on top.
        </p>
        <p className="hp-body">
          The only thing that ever reads your words is a fixed encoder that places them in that space. It
          positions; it does not act, generate, or change a thing. From there, only the measurement moves;
          the words themselves never reach a generative model or an agent, and never become training data.
          The two readings never merge, so the instrument cannot collapse into a generated answer. The field
          never resolves, so it never returns a verdict. You compose; the instrument observes; the
          authorship stays with you.
        </p>
        <p className="hp-body">
          This is what lets Habitat sit in front of model-work instead of competing with it. The shape it
          returns is yours to carry into whatever tools you use, and the words that made the shape never
          leave your hands to get there.
        </p>

        <h2 className="hp-h2">What is established, and what is not</h2>
        <p className="hp-body">
          <strong>Established.</strong> The instrument works on a real corpus. When structure is allowed to
          vary with meaning, the coupling between them forms and carries signal, and the instrument can tell
          a dimension your writing actively contests from one it is silently unanimous about. The mechanism
          that keeps the two readings from collapsing holds. The physical qualities of the field &mdash;
          where it concentrates, how stiff it is, what it holds ready &mdash; are measured from the
          field&rsquo;s own movement, not borrowed as metaphor.
        </p>
        <p className="hp-body">
          <strong>Not yet established.</strong> The readings so far come from a narrow set of texts. The
          method has not been shown to hold across corpora chosen to be deliberately unlike one another:
          the test that separates a method from a single striking case. And the fuller claim, that this
          measures a practice shared <em>between</em> people, becomes literal only when the coupling runs
          from one author to another. That is the next thing to build, named plainly as not yet built.
        </p>

        <h2 className="hp-h2">The short form</h2>
        <p className="hp-body">
          Habitat is an instrument for observing how meaning takes shape in your own composing: measured by
          placing your words, never converting them; returned for you to read, never resolved for you. It is
          caught inside the practice it measures rather than standing outside it. That is not a limitation
          to engineer away. It is the whole point: an instrument that respects use cannot occupy a position
          above it, and Habitat is built to stay inside.
        </p>

        <p className="hp-attrib">
          Curious Company holds the method. Habitat Foundation carries it to communities as a public
          instrument.
        </p>

        <p className="hp-back"><Link to="/">&larr; Curious</Link></p>
      </main>

      <style>{`
        .hp-scroll {
          height: 100%;
          overflow-y: auto;
          background: #ffffff;
          color: #1a1a1a;
        }
        .hp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
        }
        /* brand zone — its own segment, ready for an SVG wordmark */
        .hp-brand { display: flex; align-items: center; }
        .hp-wordmark {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.02em;
          color: #1a1a1a;
          text-decoration: none;
        }
        .hp-nav { display: flex; gap: 1.4rem; align-items: center; }
        .hp-navlink {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #1a1a1a;
          text-decoration: none;
        }
        .hp-navlink:hover { color: #b65a36; }
        .hp-main { max-width: 40rem; margin: 0 auto; padding: 2.5rem 2rem 6rem; }
        .hp-kicker {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.76rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8a8a8a;
          margin-bottom: 0.9rem;
        }
        .hp-title {
          font-family: "EB Garamond", Georgia, serif;
          font-weight: 500;
          font-size: clamp(2.6rem, 7vw, 4rem);
          line-height: 1.04;
          margin-bottom: 1.6rem;
        }
        .hp-lede {
          font-family: "EB Garamond", Georgia, serif;
          font-size: 1.39rem;
          font-weight: 500;
          line-height: 1.5;
          color: #2a2a2a;
          margin-bottom: 1.1rem;
        }
        .hp-rule {
          border: 0;
          height: 1px;
          background: #e2dccf;
          margin: 2rem 0 2.2rem;
        }
        .hp-h2 {
          font-family: "EB Garamond", Georgia, serif;
          font-weight: 600;
          font-size: 1.5rem;
          line-height: 1.2;
          color: #1a1a1a;
          margin: 2.8rem 0 0.9rem;
        }
        .hp-body {
          font-family: "EB Garamond", Georgia, serif;
          font-size: 1.23rem;
          font-weight: 500;
          line-height: 1.62;
          color: rgb(64, 70, 74);
          margin-bottom: 1.05rem;
        }
        .hp-body strong { font-weight: 600; color: #1a1a1a; }
        .hp-body em { font-style: italic; }
        .hp-attrib {
          font-family: "EB Garamond", Georgia, serif;
          font-style: italic;
          font-size: 1rem;
          color: #6a6258;
          margin-top: 3.2rem;
          padding-top: 1.4rem;
          border-top: 1px solid #e6e0d6;
        }
        .hp-back {
          margin-top: 2.4rem;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.85rem;
        }
        .hp-back a { color: #8a8a8a; text-decoration: none; }
        .hp-back a:hover { color: #1a1a1a; }
      `}</style>
    </div>
  );
}
