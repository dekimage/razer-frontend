import React from "react";
import "./style.scss";

class Spell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { spell, context } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="spell">
        <div
          className="spellHeader"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          <div className="spellHeader-image">
            <img src={`http://localhost:1337${spell.image.url}`} />
          </div>
          <div className="spellHeader-containerName">
            <div className="spellHeader-name text-header">{spell.name}</div>
            <div className="spellHeader-type text-small">
              <div className={`spellHeader-type-icon ${spell.type}`}></div>
              {spell.type}
            </div>
          </div>
          <div className="spellHeader-expand">
            {isOpen ? (
              <ion-icon name="chevron-up-outline"></ion-icon>
            ) : (
                <ion-icon name="chevron-down-outline"></ion-icon>
              )}
          </div>
        </div>
        {isOpen && (
          <div className="spellBody">
            <div className="spellBody-explanation">Explanation:</div>
            <div className="text-content">{spell.description}</div>
            {context.user && (
              <div>
                {context.checkToggle(spell.id, "spells") ? (
                  <div
                    className="spellBody-btn forget"
                    onClick={() =>
                      context.onSaveFavorBuild(spell, false, "spells")
                    }
                  >
                    Forget Spell
                  </div>
                ) : (
                    <div
                      className="spellBody-btn learn"
                      onClick={() =>
                        context.onSaveFavorBuild(spell, true, "spells")
                      }
                    >
                      + Learn Spell
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Spell;
