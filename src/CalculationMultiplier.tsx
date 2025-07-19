import { useState } from 'react'
import React from 'react'
import './CalculationMultiplier.css'

function CalculationMultiplier () {
  const [lowRisk, setLowRisk] = useState(3)
  const [mediumRisk, setMediumRisk] = useState(5)
  const [highRisk, setHighRisk] = useState(8)

  const lowRiskPosMultiplier = 1.1
  const lowRiskNegMultiplier = 0.95

  const mediumRiskPosMultiplier = 1.15
  const mediumRiskNegMultiplier = 0.9

  const highRiskPosMultiplier = 1.21
  const highRiskNegMultiplier = 0.85

  // Helper to apply multiplier
  const getNextValue = (risk: number, posMultiplier: number, negMultiplier: number) => {
    if (Math.random() > 0.43) { // 57% chance to apply positive multiplier
      return risk * posMultiplier
    } else {
      return risk * negMultiplier
    }
  }

  // Update values every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLowRisk(prev => getNextValue(prev, lowRiskPosMultiplier, lowRiskNegMultiplier))
      setMediumRisk(prev => getNextValue(prev, mediumRiskPosMultiplier, mediumRiskNegMultiplier))
      setHighRisk(prev => getNextValue(prev, highRiskPosMultiplier, highRiskNegMultiplier))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
      <div className="RiskCard">
        <h1 style={{ marginTop: 5 }}>SafeCo</h1>
        <p style={{ marginBottom: 20, marginTop: -25 }}>Low Risk</p>
        <h2 style={{ marginBottom: 5 }}>{lowRisk.toFixed(1)}</h2>
      </div>
      <div className="RiskCard">
        <h1 style={{ marginTop: 5 }}>Apple</h1>
        <p style={{ marginBottom: 20, marginTop: -25 }}>Medium Risk</p>
        <h2 style={{ marginBottom: 5 }}>{mediumRisk.toFixed(1)}</h2>
      </div>
      <div className="RiskCard">
        <h1 style={{ marginTop: 5 }}>DogeCoin</h1>
        <p style={{ marginBottom: 20, marginTop: -25 }}>High Risk</p>
        <h2 style={{ marginBottom: 5 }}>{highRisk.toFixed(1)}</h2>
      </div>
    </div>

    // Starts at low, med, high,
    // Then every 10 seconds, it gets timesed by a multiplier.
    // There are 2 multiplers for every risk level
    // Low: 1.1, 0.95
    // Medium: 1.2, 0.9
    // High: 1.3, 0.85
    // The multiplier is applied to each risk level every 10 seconds
  )
}

export default CalculationMultiplier