/*
 * Public API Surface of racing-bars
 */

export * from './lib/racing-bars.component';
export * from './lib/racing-bars.module';

// This folder is a symbolic link to the original library
// (workaround for "'rootDir' is expected to contain all source files")
// https://github.com/angular/angular/issues/37276
export * as racingBars from './srclib';
