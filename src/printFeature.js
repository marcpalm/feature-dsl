function printSteps (scenario, type) {
    if (!type || !scenario || !scenario[type] || !scenario[type].length) {
        return ''
    } else {
        return scenario[type].map(
            (step, index) => 
                `    ${index === 0 ? type.substring(0,1).toUpperCase() + type.substring(1) : 'And'} ${step}`
        ).join('\n')
    }

} 

function printScenario ( scenario ) {
    return `  Scenario: ${scenario.scenario}
${[ printSteps(scenario, 'given'), printSteps(scenario, 'when'), printSteps(scenario, 'then')].filter(_=> !!_).join('\n')}`
} 

function printFeature ( features ) {
    return `Feature: ${features.feature}
  As ${features.perspective}
  I want ${features.desire}
  In order ${features.reason}

${features.scenarios.map(scenario => printScenario(scenario)).join('\n\n')}
`
}

module.exports = exports = printFeature
