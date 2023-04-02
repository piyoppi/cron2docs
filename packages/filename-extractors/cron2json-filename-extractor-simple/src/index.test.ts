import { test, expect } from 'vitest'
import { Cron2JsonSimpleFilenameExtractor } from './index'

test('Should return filename', () => {
  const extractor = new Cron2JsonSimpleFilenameExtractor(
    [
      '/usr/src/hoge.sh',
      '/usr/bin/fuga.sh',
      '/home/hoge/fuga/piyo.sh',
      '/foo/bar/fuga/piyo.sh'
    ],
    {
      baseDir: '/foo/bar/',
      overridePathes: [
        {
          from: '/var/hoge/',
          to: '/home/hoge/'
        }
      ]
    }
  )

  expect(extractor.extract('/bin/bash -l -c "/usr/src/hoge.sh"')).toEqual('/usr/src/hoge.sh')
  expect(extractor.extract('/bin/bash -l -c "/usr/bin/fuga.sh"')).toEqual('/usr/bin/fuga.sh')
  expect(extractor.extract('/bin/bash -l -c "/usr/bin/foo.sh"')).toEqual(null)
  expect(extractor.extract('/bin/bash -l -c "/var/hoge/fuga/piyo.sh"')).toEqual('/home/hoge/fuga/piyo.sh')
  expect(extractor.extract('/bin/bash -l -c "fuga/piyo.sh"')).toEqual('/foo/bar/fuga/piyo.sh')
})

test('Should return the filename even if there is no trailing slash in the options', () => {
  const extractor = new Cron2JsonSimpleFilenameExtractor(
    [
      '/home/hoge/fuga/piyo.sh',
      '/foo/bar/fuga/piyo.sh'
    ],
    {
      baseDir: '/foo/bar',
      overridePathes: [
        {
          from: '/var/hoge',
          to: '/home/hoge'
        }
      ]
    }
  )

  expect(extractor.extract('/bin/bash -l -c "/var/hoge/fuga/piyo.sh"')).toEqual('/home/hoge/fuga/piyo.sh')
  expect(extractor.extract('/bin/bash -l -c "fuga/piyo.sh"')).toEqual('/foo/bar/fuga/piyo.sh')
})

test('Should return the filename if the baseDir option is given', () => {
  const extractor = new Cron2JsonSimpleFilenameExtractor(
    [
      '/home/hoge/fuga/piyo.sh',
      '/foo/bar/fuga/piyo.sh'
    ],
    {
      baseDir: '/foo/bar/'
    }
  )

  expect(extractor.extract('/bin/bash -l -c "/var/hoge/fuga/piyo.sh"')).toEqual(null)
  expect(extractor.extract('/bin/bash -l -c "fuga/piyo.sh"')).toEqual('/foo/bar/fuga/piyo.sh')
})

test('Should return the filename if the overridePathes option is given', () => {
  const extractor = new Cron2JsonSimpleFilenameExtractor(
    [
      '/home/hoge/fuga/piyo.sh',
      '/foo/bar/fuga/piyo.sh'
    ],
    {
      overridePathes: [
        {
          from: '/var/hoge/',
          to: '/home/hoge/'
        }
      ]
    }
  )

  expect(extractor.extract('/bin/bash -l -c "/var/hoge/fuga/piyo.sh"')).toEqual('/home/hoge/fuga/piyo.sh')
  expect(extractor.extract('/bin/bash -l -c "fuga/piyo.sh"')).toEqual(null)
})

test('Should throw an error when the whitelist is including relative paths', () => {
  expect(() => new Cron2JsonSimpleFilenameExtractor(['hoge/fuga.sh'])).toThrow('The filename hoge/fuga.sh whitelist must not contain relative paths')
})

test('Should throw an error when the baseDir is including relative paths', () => {
  expect(() => new Cron2JsonSimpleFilenameExtractor(['/hoge/fuga.sh'], {baseDir: 'foo/bar'})).toThrow('The baseDir must not contain relative paths')
})

test('Should throw an error when the overridePath is including relative paths', () => {
  expect(() => new Cron2JsonSimpleFilenameExtractor(['/hoge/fuga.sh'], {overridePathes: [{from: 'hoge/fuga', to: '/foo/bar/'}]})).toThrow('The overridePathes(from) must not contain relative paths')
  expect(() => new Cron2JsonSimpleFilenameExtractor(['/hoge/fuga.sh'], {overridePathes: [{from: '/hoge/fuga', to: 'foo/bar/'}]})).toThrow('The overridePathes(to) must not contain relative paths')
})
