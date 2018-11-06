Feature: Can drink beer when thirsty
  As a drinker
  I want to take beer off the wall
  In order to satisfy my thirst

  Scenario: Can take a single beer
    Given 100 bottles of beer on the wall
    When a bottle is taken down
    And a bottle is taken down
    Then there are 98 bottles of beer on the wall

  Scenario: Can take multiple beers
    Given 100 bottles of beer on the wall
    When 5 bottles are taken down
    Then there are 95 bottles of beer on the wall

  Scenario: Ghosts can drink
    Given 100 bottles of beer on the wall
    And there is nobody in the room
    When 5 bottles are taken down
    And they are floating in the air
    Then there are 95 bottles of beer on the wall
    And there are ghosts in the room