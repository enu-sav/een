<?php

namespace Drupal\een_base\Plugin\LayoutOption;

use Drupal\Core\Form\FormStateInterface;
use Drupal\layout_options\Annotation\LayoutOption;
use Drupal\layout_options\OptionBase;
use Drupal\media\Entity\Media;

/**
 * Layout Option plugin to add a background image to layout/layout regions.
 *
 * @LayoutOption(
 *   id = "een_layout_background_image",
 *   label = @Translation("EEN - Background image"),
 *   description = @Translation("A layout configuration option that adds a background image to layout and/or regions")
 * )
 */
class BackgroundImage extends OptionBase {

  /**
   * {@inheritdoc}
   */
  public function processFormOption(string $region, array $form, FormStateInterface $formState, $default): array {
    $def = $this->getDefinition();

    $form_element = [
      '#type' => 'media_library',
      '#allowed_bundles' => ['image'],
      '#title' => t('Upload your image'),
      '#default_value' => !empty($default) ? $default : NULL,
      '#description' => t('Upload or select your background image.'),
    ];

    if (isset($def['weight'])) {
      $form_element['#weight'] = $def['weight'];
    }
    $optionId = $this->getOptionId();
    $form[$region][$optionId] = $form_element;

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateFormOption(array &$form, FormStateInterface $formState): void {
    $this->validateCssIdentifier($form, $formState, FALSE);
  }

  /**
   * {@inheritdoc}
   */
  public function processOptionBuild(array $regions, array $build, string $region, $value): array {
    $property = '';

    if ($media = Media::load($value)) {
      if (!$media->get('field_media_image')->isEmpty()) {
        $media_uri = $media->get('field_media_image')->entity->getFileUri();
        $url = \Drupal::service('file_url_generator')->generateAbsoluteString($media_uri);
        $property = "background-image:url({$url})";
      }
    }

    return $this->processAttributeOptionBuild('style', $regions, $build, $region, $property);
  }

  /**
   * {@inheritDoc}
   * @see \Drupal\layout_options\OptionBase::getDefinitionAttributes()
   */
  public function getDefinitionAttributes(): array {
    return parent::getDefinitionAttributes();
  }
}
