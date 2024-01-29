<?php

namespace Drupal\een_base\Plugin\Layout;

/**
 * Configurable two column layout plugin class.
 *
 * @internal
 *   Plugin classes are internal.
 */
class TwoColumnLayout extends MultiWidthLayoutBase {

  /**
   * {@inheritdoc}
   */
  protected function getWidthOptions(): array {
    return [
      '50-50' => '50%/50%',
      '25-75' => '25%/75%',
      '75-25' => '75%/25%',
      '33-67' => '33%/67%',
      '67-33' => '67%/33%',
      'spec-px' => '510px/550px',
      'spec-px-second' => '460px/550px',
    ];
  }

  /**
   * {@inheritdoc}
   */
  protected function getDefaultWidth() {
    return '50-50';
  }

}
