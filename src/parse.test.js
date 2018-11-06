/**
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * 
 * Original: https://github.com/bakerface/gherk/blob/master/test/parse.js
 */

var parse = require('./parse');

describe('parse(text)', function() {
  it('should return an empty list when text is undefined', function() {
    expect(parse()).toEqual([ ]);
  });

  it('should throw an error if malformed', function(done) {
    var feature = [
      'Feature: Can drink beer when thirsty',
      '  As a drinker',
      '  I want to take beer off the wall',
      '  In order to satisfy my thirst',
      '',
      '  Scenario: Can take a single beer',
      '    Given 100 bottles of beer on the wall',
      '    When a bottle is taken down',
      '    Then there are 99 bottles of beer on the wall',
      '',
      '  Scenario: Can take multiple beers',
      '    Given 100 bottles of beer on the wall',
      '    When 5 bottles are taken down',
      '    Oh wow, this is a mistake',
      '    Then there are 95 bottles of beer on the wall',
      '',
      '  Scenario: Ghosts can drink',
      '    Given 100 bottles of beer on the wall',
      '    And there is nobody in the room',
      '    When 5 bottles are taken down',
      '    And they are floating in the air',
      '    Then there are 95 bottles of beer on the wall',
      '    And there are ghosts in the room'
    ].join('\r\n');

    try {
      parse(feature);
    }
    catch (e) {
      expect(e).toEqual(new SyntaxError('Oh wow, this is a mistake'));
      done();
    }
  });

  it('should parse a string', function() {
    var feature = [
      'Feature: Can drink beer when thirsty',
      '  As a drinker',
      '  I want to take beer off the wall',
      '  In order to satisfy my thirst',
      '',
      '  Scenario: Can take a single beer',
      '    Given 100 bottles of beer on the wall',
      '    When a bottle is taken down',
      '    Then there are 99 bottles of beer on the wall',
      '',
      '  Scenario: Can take multiple beers',
      '    Given 100 bottles of beer on the wall',
      '    When 5 bottles are taken down',
      '    Then there are 95 bottles of beer on the wall',
      '',
      '  Scenario: Ghosts can drink',
      '    Given 100 bottles of beer on the wall',
      '    And there is nobody in the room',
      '    When 5 bottles are taken down',
      '    And they are floating in the air',
      '    Then there are 95 bottles of beer on the wall',
      '    And there are ghosts in the room'
    ].join('\r\n');

    expect(parse(feature)).toEqual([
      {
        feature: 'Can drink beer when thirsty',
        perspective: 'a drinker',
        desire: 'to take beer off the wall',
        reason: 'to satisfy my thirst',
        scenarios: [
          {
            scenario: 'Can take a single beer',
            given: [
              '100 bottles of beer on the wall'
            ],
            when: [
              'a bottle is taken down'
            ],
            then: [
              'there are 99 bottles of beer on the wall'
            ]
          },
          {
            scenario: 'Can take multiple beers',
            given: [
              '100 bottles of beer on the wall'
            ],
            when: [
              '5 bottles are taken down'
            ],
            then: [
              'there are 95 bottles of beer on the wall'
            ]
          },
          {
            scenario: 'Ghosts can drink',
            given: [
              '100 bottles of beer on the wall',
              'there is nobody in the room'
            ],
            when: [
              '5 bottles are taken down',
              'they are floating in the air'
            ],
            then: [
              'there are 95 bottles of beer on the wall',
              'there are ghosts in the room'
            ]
          }
        ]
      }
    ]);
  });

  it('should parse a buffer', function() {
    var feature = [
      'Feature: Can drink beer when thirsty',
      '  As a drinker',
      '  I want to take beer off the wall',
      '  So that I can satisfy my thirst',
      '',
      '  Scenario: Can take a single beer',
      '    Given 100 bottles of beer on the wall',
      '    When a bottle is taken down',
      '    Then there are 99 bottles of beer on the wall',
      '',
      '  Scenario: Can take multiple beers',
      '    Given 100 bottles of beer on the wall',
      '    When 5 bottles are taken down',
      '    Then there are 95 bottles of beer on the wall',
      '',
      '  Scenario: Ghosts can drink',
      '    Given 100 bottles of beer on the wall',
      '    And there is nobody in the room',
      '    When 5 bottles are taken down',
      '    And they are floating in the air',
      '    Then there are 95 bottles of beer on the wall',
      '    But there are ghosts in the room'
    ].join('\r\n');

    expect(parse(new Buffer(feature))).toEqual([
      {
        feature: 'Can drink beer when thirsty',
        perspective: 'a drinker',
        desire: 'to take beer off the wall',
        reason: 'I can satisfy my thirst',
        scenarios: [
          {
            scenario: 'Can take a single beer',
            given: [
              '100 bottles of beer on the wall'
            ],
            when: [
              'a bottle is taken down'
            ],
            then: [
              'there are 99 bottles of beer on the wall'
            ]
          },
          {
            scenario: 'Can take multiple beers',
            given: [
              '100 bottles of beer on the wall'
            ],
            when: [
              '5 bottles are taken down'
            ],
            then: [
              'there are 95 bottles of beer on the wall'
            ]
          },
          {
            scenario: 'Ghosts can drink',
            given: [
              '100 bottles of beer on the wall',
              'there is nobody in the room'
            ],
            when: [
              '5 bottles are taken down',
              'they are floating in the air'
            ],
            then: [
              'there are 95 bottles of beer on the wall',
              'there are ghosts in the room'
            ]
          }
        ]
      }
    ]);
  });
});