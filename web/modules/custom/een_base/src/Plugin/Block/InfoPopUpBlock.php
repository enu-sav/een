<?php

namespace Drupal\een_base\Plugin\Block;

use Drupal;
use Drupal\block\Entity\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Routing\RedirectDestinationTrait;

/**
 * Provides a 'InfoPopUpBlock' Block.
 *
 * @Block(
 *   id = "een_info_pop_up_block",
 *   admin_label = @Translation("EEN Info - PopUp"),
 * )
 */
class InfoPopUpBlock extends BlockBase {

  use RedirectDestinationTrait;

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    if (getenv('ENVIRONMENT_INDICATOR_NAME') == 'Develop' || getenv('ENVIRONMENT_INDICATOR_NAME') == 'Development') {
      $prod_url = [
        'url' => 'https://encyclopedianetwork.eu/',
        'text' => 'encyclopedianetwork.eu',
      ];
      $build['#attached']['library'][] = 'een/info_popup';
      $build['#attached']['drupalSettings']['een_base']['info_popup_delay'] = 1;

      $build['info_popup_block'] = [
        '#theme' => 'info_popup_block',
        '#prod_url' => $prod_url,
      ];
    }

    return $build;
  }

}
