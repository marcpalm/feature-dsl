class Runner {
    constructor (props) {
        this.props = Object.assign({
            steps: [],
            init: (runner) => {},
            afterAll: (runner, feature) =>  {},
            beforeAll: (runner, feature) => {},
            afterEach: (runner, feature, type, index) => {},
            beforeEach: (runner, feature, type, index) => {},
            afterError: (runner, feature, type, index, error) => {},
            clean: (runner) => {}
        }, props)
    }

    addStep (steps) {
        steps
            .forEach(
                step => {
                    if (!step.regexp || typeof step.default !== 'function') {
                        throw new Error(`Error in Runner.addSteps: arguments regexp or default missing for step\n${JSON.stringify(step, null, 2)}`)
                    }
                }
            )

        this.props = Object.assign({},
            this.props,
            {
                steps: [...this.props.steps, ...steps]
            }
        )
    }

    async getStep (expression) {
        const stepDefinitions = this.props.steps.filter(_ => _.test(expression))

        if (stepDefinitions.length === 0) {
            throw new Error(`No definition for ${expression}`)
        } else if (stepDefinitions.length > 1) {
            throw new Error(`Ambiguous definition for ${expression}: ${['', ...stepDefinitions].join('\n\t')}`)
        } else {
            return stepDefinitions[0]
        }

    }

    async run (features) {
        await this.props.init(this)

        for (let feature of features) {

            for (let scenario of feature.scenarios) {
                this.props.beforeAll(this, feature)

                try {
                    let index = 0
                    for (let type of ['given', 'when', 'then']) {
                        for (let step of scenario.given) {
                            await this.props.beforeEach(this, feature, type, index)
                            const stepDefinition = this.getStep(step)
                            const func = stepDefinition[type] || stepDefinition.default

                            if (!func) {
                                throw new Error(`Function for expression ${expression} not defined for type ${type}.`)
                            }
                            try {
                                await func(step, this, feature, type, index)
                            } catch (e) {
                                await this.props.beforeEach(this, feature, type, index, e)
                                throw e
                            }
                            await this.props.afterEach(this, feature, type, index)
                            index++
                        }
                    }

                    this.props.afterAll(this, feature)

                } catch (anotherError) {
                    // do nothing
                }
            }
        }

        await this.props.clean(this)
    }
}

module.exports = exports = Runner