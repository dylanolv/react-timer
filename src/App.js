import React, { Component } from "react";

class AddCompteur extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listeDeCompteur: []
        };
        this.addComponent = this.addComponent.bind(this);
    }

    addComponent(event) {
        const listeDeCompteur = this.state.listeDeCompteur;
        this.setState({
            listeDeCompteur: listeDeCompteur.concat(<Timer minutes={10} />)
        });
    }

    render() {
        return (
            <div>
                <button class="button" onClick={this.addComponent}>
                    Ajouter un compteur
                </button>
                {this.state.listeDeCompteur}
            </div>
        );
    }
}

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libelle: "",
            minutes: "",
            secondes: "00",
            finished: false
        };
        this.stopCountDown = this.stopCountDown.bind(this);
        this.restartCountDown = this.restartCountDown.bind(this);
    }

    tick() {
        let sec = this.state.secondes;

        this.setState({
            secondes: this.state.secondes - 1
        });

        if (sec === "00") {
            this.setState({
                minutes: this.state.minutes - 1,
                secondes: 59
            });
        }

        if (this.state.secondes < 10) {
            this.setState({
                secondes: "0" + this.state.secondes
            });
        }

        if (this.state.minutes === 0 && this.state.secondes === "00") {
            this.setState({
                finished: true
            });
            clearInterval(this.timer);
        }
    }

    stopCountDown() {
        clearInterval(this.timer);
    }

    restartCountDown() {
        if (this.state.finished === false) {
            this.setState({
                secondes: this.state.secondes,
                minutes: this.state.minutes
            });

            this.timer = setInterval(() => this.tick(), 1000);
        } else {
            return false;
        }
    }

    handleChangeLibelle = e => {
        this.setState({
            libelle: e.target.value
        });
    };

    handleChangeMinutes = e => {
        this.setState({
            minutes: e.target.value
        });
    };

    render() {
        return (
            <div class="compteur">
                <h2>{this.state.libelle}</h2>
                <input
                    type="text"
                    name="libelle"
                    onChange={this.handleChangeLibelle}
                    placeholder="Libelle"
                />
                <input
                    type="number"
                    name="minutes"
                    onChange={this.handleChangeMinutes}
                    placeholder="Minutes"
                />
                <h3>
                    {" "}
                    {this.state.minutes}:{this.state.secondes}
                </h3>
                <button class="button" onClick={this.stopCountDown}>
                    Pause
                </button>
                <button class="button" onClick={this.restartCountDown}>
                    Start
                </button>
            </div>
        );
    }
}

const App = () => {
    return (
        <div>
            <AddCompteur />
            <Timer />
            <Timer />
        </div>
    );
};

export default App;
