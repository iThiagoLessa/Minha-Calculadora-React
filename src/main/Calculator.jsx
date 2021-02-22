import React, { Component } from 'react';
import "./Calculator.css";
import Display from "../components/Display";
import Button from "../components/Button";

const incialState = {
    displayValue: 0,
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = {...incialState};

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.setOperation = this.setOperation.bind(this);
    }

    addDigit(n) {
        if(n === "." && this.state.displayValue.includes(".")){
            return
        }
        const clearDisplay = this.state.displayValue === 0 || this.state.clearDisplay;
        //console.log(`clearDisplay: ${clearDisplay}`);
        const currentValue =  clearDisplay ? '' : this.state.displayValue;
        //console.log(`currentvalue: ${currentValue}`);
        const displayValue = currentValue + n;
        this.setState({displayValue, clearDisplay: false});
        if(n != ".") {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            // clonando o array de objetos
            const values = [...this.state.values];
            //adicionando novo valor no indice
            values[i] = newValue;
            this.setState({values});
           // console.log(values);
        }
    }

    clearMemory() {
        //restaurando o valor da constante inicial state utilizando o operador spread
        this.setState({...incialState});
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({operation, current : 1, clearDisplay: true});
        }else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;
            const values = [...this.state.values];
            switch(currentOperation) {
                case '+':
                    values[0] = values[0] + values[1];
                    break;
                case '*' : 
                    values[0] = values[0] * values[1];
                    break;
                case '/':
                    values[0] = values[0] / values[1];
                    break;
            }
            values[1] = 0;
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            });
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display initial={this.state.displayValue} />
                <Button click={this.clearMemory} triple label="Ac"/>
                <Button operation click={this.setOperation} label="/"/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button operation click={this.setOperation} label="*"/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button operation click={this.setOperation} label="-"/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button operation click={this.setOperation} label="+"/>
                <Button double label="0" click={this.addDigit}/>
                <Button label="." click={this.addDigit}/>
                <Button operation click={this.setOperation} label="="/>
            </div>
        )
    }
}