<?php

/**
 * @file
 * Contains \Drupal\een_base\Form\SettingsForm.
 */

namespace Drupal\een_base\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\NodeInterface;
use Drupal\system\Entity\Menu;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configure site specific settings.
 */
class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'een_base_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'een_base.settings',
    ];
  }

  /**
   * Constructs.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The factory for configuration objects.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    parent::__construct($config_factory);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('een_base.settings');

    $form['site_settings'] = [
      '#type' => 'vertical_tabs',
      '#title' => $this->t('Site settings'),
    ];

    $form['general'] = [
      '#type' => 'details',
      '#title' => $this->t('General'),
      '#group' => 'site_settings',
      '#tree' => TRUE,
      '#weight' => 10,
    ];

    $form['general']['contacts'] = [
      '#type' => 'details',
      '#title' => $this->t('Contacts'),
      '#open' => TRUE,
    ];

    $form['general']['contacts']['text'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Text'),
      '#default_value' => $config->get('general.contacts.text')['value'] ?? '',
      '#format' => $config->get('general.contacts.text')['format'] ?? '',
      '#base_type' => 'textarea',
    ];

    $form['general']['contacts']['email'] = [
      '#type' => 'textfield',
      '#title' => $this->t('E-mail'),
      '#default_value' => $config->get('general.contacts.email'),
    ];

    $form['general']['contacts']['phone_number'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Phone number'),
      '#default_value' => $config->get('general.contacts.phone_number'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $config = $this->config('een_base.settings');
    $groups = ['general'];

    foreach ($groups as $group) {
      foreach ($form_state->getValue($group) as $name => $values) {
        foreach ($values as $key => $options) {
          $config->set(implode('.', [$group, $name, $key]), $options);
        }
      }
    }

    $config->save();

    parent::submitForm($form, $form_state);
  }

}
