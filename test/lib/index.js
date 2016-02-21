import assert from 'assert';

import { buildClassName } from '../../lib/';

describe('buildClassName', function() {
    it('is function', function() {
        assert(typeof buildClassName === 'function');
    });

    it('empty class if called without argument', function() {
        assert(buildClassName() === '');
    });

    it('empty class if no block and mix', function() {
        assert(buildClassName({}) === '');
    });

    it('empty class if no block and mix, but with className', function() {
        assert(buildClassName({ className: 'lol' }) === 'lol');
    });

    describe('block', function() {
        it('simple', function() {
            assert(buildClassName({ block: 'block' }) === 'block');
        });

        it('props.className + block', function() {
            assert(
                buildClassName({
                    block: 'block2',
                    className: 'block1'
                }) === 'block1 block2'
            );
        });
    });

    describe('mods', function() {
        describe('block', function() {
            it('block + mod', function() {
                assert(
                    buildClassName({
                        block: 'block',
                        mods: {
                            mod: 'val'
                        }
                    }) === 'block block_mod_val'
                );
            });

            it('block + few mods', function() {
                assert(
                    buildClassName({
                        block: 'block',
                        mods: {
                            mod1: 'val1',
                            mod2: 'val2'
                        }
                    }) === 'block block_mod1_val1 block_mod2_val2'
                );
            });

            it('block + shorthand mod = true', function() {
                assert(
                    buildClassName({
                        block: 'block',
                        mods: {
                            mod: true
                        }
                    }) === 'block block_mod'
                );
            });

            it('block + shorthand mod = false', function() {
                assert(
                    buildClassName({
                        block: 'block',
                        mods: {
                            mod: false
                        }
                    }) === 'block'
                );
            });
        });

        describe('elem', function() {
            it('block + elem + mod', function() {
                assert(
                    buildClassName({
                        block: 'block',
                        elem: 'elem',
                        mods: {
                            mod: 'val'
                        }
                    }) === 'block__elem block__elem_mod_val'
                );
            });

            it('block + elem + few mods', function() {
                assert(
                    buildClassName({
                        block: 'block',
                        elem: 'elem',
                        mods: {
                            mod1: 'val1',
                            mod2: 'val2'
                        }
                    }) === 'block__elem block__elem_mod1_val1 block__elem_mod2_val2'
                );
            });

            it('block + shorthand mod = true', function() {
                assert(
                    buildClassName({
                        block: 'block',
                        elem: 'elem',
                        mods: {
                            mod: true
                        }
                    }) === 'block__elem block__elem_mod'
                );
            });

            it('block + shorthand mod = false', function() {
                assert(
                    buildClassName({
                        block: 'block',
                        elem: 'elem',
                        mods: {
                            mod: false
                        }
                    }) === 'block__elem'
                );
            });
        });
    });

    describe('mix', function() {
        it('mix without block', function() {
            assert(
                buildClassName({
                    mix: {
                        block: 'block'
                    }
                }) === 'block'
            );
        });

        it('block + mix', function() {
            assert(
                buildClassName({
                    block: 'block1',
                    mix: {
                        block: 'block2'
                    }
                }) === 'block1 block2'
            );
        });

        it('block + mods + mix', function() {
            assert(
                buildClassName({
                    block: 'block1',
                    mods: {
                        mod: 'val'
                    },
                    mix: {
                        block: 'block2'
                    }
                }) === 'block1 block1_mod_val block2'
            );
        });

        it('block + elem + mix', function() {
            assert(
                buildClassName({
                    block: 'block1',
                    elem: 'elem',
                    mix: {
                        block: 'block2'
                    }
                }) === 'block1__elem block2'
            );
        });

        it('block + elem + mods + mix', function() {
            assert(
                buildClassName({
                    block: 'block1',
                    elem: 'elem',
                    mods: {
                        mod: 'val'
                    },
                    mix: {
                        block: 'block2'
                    }
                }) === 'block1__elem block1__elem_mod_val block2'
            );
        });

        it('complex mix', function() {
            assert(
                buildClassName({
                    block: 'block1',
                    mix: {
                        block: 'block2',
                        elem: 'elem',
                        mods: {
                            mod1: 'val1',
                            mod2: 'val2'
                        }
                    }
                }) === 'block1 block2__elem block2__elem_mod1_val1 block2__elem_mod2_val2'
            );
        });

        it('multiple mixes', function() {
            assert(
                buildClassName({
                    block: 'block1',
                    mix: [
                        {
                            block: 'block2'
                        },
                        {
                            block: 'block3'
                        }
                    ]
                }) === 'block1 block2 block3'
            );
        });

        it('multiple mixes with holes', function() {
            assert(
                buildClassName({
                    block: 'block1',
                    mix: [
                        undefined,
                        {
                            block: 'block2'
                        },
                        null
                    ]
                }) === 'block1 block2'
            );
        });

        it('recursive mixes', function() {
            assert(
                buildClassName({
                    block: 'block1',
                    mix: {
                        block: 'block2',
                        mix: {
                            block: 'block3'
                        }
                    }
                }) === 'block1 block2 block3'
            );
        });
    });
});
