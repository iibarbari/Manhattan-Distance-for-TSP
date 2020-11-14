import { Manhattan } from '../scripts';
import { expect } from 'chai';
import 'mocha';

describe('Test Manhattan Class', () => {
  it('Doesn\'t move if same unit', () => {
    const { distance, details } = new Manhattan({ corr: 2, unit: 19 }, { corr: 2, unit: 19 });

    expect(details).to.equal('down|down|stays|same|backwards');
    expect(distance).to.equal(0);
  });

  it('FromDir: Up | ToDir: Up | Hall: Same | Direction: Forwards', () => {
    const { distance, details } = new Manhattan({ corr: 1, unit: 7 }, { corr: 1, unit: 19 });

    expect(details).to.equal('up|up|moves|same|forwards');
    expect(distance).to.equal(6);
  });

  it('FromDir: Down | ToDir: Down | Hall: Same | Direction: Forwards', () => {
    const { distance, details } = new Manhattan({ corr: 2, unit: 19 }, { corr: 2, unit: 7 });

    expect(details).to.equal('down|down|moves|same|forwards');
    expect(distance).to.equal(6);
  });

  it('FromDir: Up | ToDir: Up | Hall: Same | Direction: Backwards', () => {
    const { distance, details } = new Manhattan({ corr: 1, unit: 19 }, { corr: 1, unit: 7 });

    expect(details).to.equal('up|up|moves|same|backwards');
    expect(distance).to.equal(26);
  });

  it('FromDir: Down | ToDir: Down | Hall: Same | Direction: Backwards', () => {
    const { distance, details } = new Manhattan({ corr: 2, unit: 7 }, { corr: 2, unit: 19 });

    expect(details).to.equal('down|down|moves|same|backwards');
    expect(distance).to.equal(26);
  });

  it('FromDir: Up | ToDir: Down | Hall: Different | Direction: Forwards', () => {
    const { distance, details } = new Manhattan({ corr: 5, unit: 19 }, { corr: 2, unit: 7 });

    expect(details).to.equal('up|down|moves|different|forwards');
    expect(distance).to.equal(21);
  });

  it('FromDir: Up | ToDir: Down | Hall: Different | Direction: Backwards', () => {
    // const { distance, details } = new Manhattan();
    //
    // expect(details).to.equal('up|down|moves|different|backwards');
    // expect(distance).to.equal(21);
  });

  it('FromDir: Down | ToDir: Up | Hall: Different | Direction: Forwards', () => {
    // const { distance, details } = new Manhattan();
    //
    // expect(details).to.equal('down|up|moves|different|forwards');
    // expect(distance).to.equal(6);
  });

  it('FromDir: Down | ToDir: Up | Hall: Different | Direction: Backwards', () => {
    // const { distance, details } = new Manhattan();
    //
    // expect(details).to.equal('down|up|moves|different|backwards');
    // expect(distance).to.equal(15);
  });

  it('FromDir: Up | ToDir: Up | Hall: Different | Direction: Forwards', () => {
    // const { distance, details } = new Manhattan({ corr: 5, unit: 19 }, { corr: 2, unit: 7 });
    //
    // expect(details).to.equal('up|up|moves|different|forwards');
    // expect(distance).to.equal(21);
  });

  it('FromDir: Up | ToDir: Up | Hall: Different | Direction: Backwards', () => {
    // const { distance, details } = new Manhattan();
    //
    // expect(details).to.equal('up|up|moves|different|backwards');
    // expect(distance).to.equal(21);
  });

  it('FromDir: Down | ToDir: Down | Hall: Different | Direction: Forwards', () => {
    // const { distance, details } = new Manhattan();
    //
    // expect(details).to.equal('down|down|moves|different|forwards');
    // expect(distance).to.equal(6);
  });

  it('FromDir: Down | ToDir: Down | Hall: Different | Direction: Backwards', () => {
    // const { distance, details } = new Manhattan();
    //
    // expect(details).to.equal('down|down|moves|different|backwards');
    // expect(distance).to.equal(15);
  });

});
