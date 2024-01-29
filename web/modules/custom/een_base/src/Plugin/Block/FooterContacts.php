<?php

namespace Drupal\een_base\Plugin\Block;

use Drupal\Core\Block\Annotation\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a block with phone number and link.
 *
 * @Block(
 *   id = "een_footer_contacts",
 *   admin_label = @Translation("Footer Contacts"),
 *   category = @Translation("Custom")
 * )
 */
class FooterContacts extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The configuration factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected ConfigFactoryInterface $configFactory;

  /**
   * Constructs a new HeaderContacts.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param array $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    ConfigFactoryInterface $config_factory
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->configFactory = $config_factory;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): FooterContacts|ContainerFactoryPluginInterface|static {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('config.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $config = $this->configFactory->get('een_base.settings');

    $phone_number = $config->get('general.contacts.phone_number');
    $phone_number_trim = str_replace(' ', '', $phone_number);
    $email = $config->get('general.contacts.email');

    $build['content']['contact'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['contact'],
      ],
    ];

    $build['content']['contact']['email'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#value' => '<a class="item" href="mailto:' . $email . '">' . $email . '</a>',
      '#attributes' => [
        'class' => ['email'],
      ],
    ];

    $build['content']['contact']['phone_number'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#value' => '<a class="item" href="tel:' . $phone_number_trim . '">' . $phone_number . '</a>',
      '#attributes' => [
        'class' => ['phone-number'],
      ],
    ];

    return $build;
  }

}
